window.addEventListener("load", init);

let groundScene;
let groundCanvas;
let particlesGround;
let camera;
function init() {
    groundRenderer = new THREE.WebGLRenderer({
        alpha: false,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: true
    });
    groundRenderer.setPixelRatio( window.devicePixelRatio );
    groundRenderer.setSize( innerWidth, innerHeight );
    groundRenderer.autoClear = false;

    document.getElementById("particleGround").appendChild(groundRenderer.domElement);
    groundCanvas = groundRenderer.domElement;


    groundScene = new THREE.Scene();
    particlesGround = new THREE.Scene();

    clock = new THREE.Clock(true);
    scene = particlesGround
    scene.background = new THREE.Color( 0x00ffff );

    // const geometry = new THREE.SphereGeometry( 8, 16, 8 );
    // const material = new THREE.MeshPhongMaterial( { color: 0x0033ff, specular: 0x555555, shininess: 30 } );
    // sphereMesh = new THREE.Mesh(geometry, material );
    // sphereMesh.position.z = -80
    // sphereMesh.position.x = -20
    // sphereMesh.position.y = 40
    // scene.add( sphereMesh );
    addEpisodeGroup(scene, -22, 65)
    addEpisodeGroup(scene, 0, 65)
    addEpisodeGroup(scene, 22, 65)
    addEpisodeGroup(scene, -22, 45)
    addEpisodeGroup(scene, 0, 45)
    addEpisodeGroup(scene, 22, 45)
    addEpisodeGroup(scene, -22, 25)
    addEpisodeGroup(scene, 0, 25)
    addEpisodeGroup(scene, 22, 25)

    camera = new THREE.PerspectiveCamera(70, groundCanvas.width / groundCanvas.height, 1, 1000);
    initMaterials();
    initParticlesGeometry();
    initParticlesTexture();
    initTrailTexture();
    animateGround();
}

function addEpisodeGroup(scene, x, y) {
    const geometry = new THREE.SphereGeometry( 8, 16, 8 );
    const material = new THREE.MeshPhongMaterial( { color: 0x0033ff, specular: 0x555555, shininess: 30 } );
    sphereMesh = new THREE.Mesh(geometry, material );
    sphereMesh.position.z = -120
    sphereMesh.position.x = x
    sphereMesh.position.y = y
    scene.add( sphereMesh );
}

function createDoubleFBO (w, h, filtering) {
    let rt1 = new THREE.WebGLRenderTarget(w, h, {
        type:          THREE.FloatType,
        minFilter:     filtering || THREE.NearestFilter,
        magFilter:     filtering || THREE.NearestFilter,
        wrapS:     THREE.RepeatWrapping,
        wrapT:     THREE.RepeatWrapping,
        format:        THREE.RGBAFormat,
        depthBuffer:   false,
        stencilBuffer: false,
        anisotropy:    1,
    });

    let rt2 = new THREE.WebGLRenderTarget(w, h, {
        type:          THREE.FloatType,
        minFilter:     filtering || THREE.NearestFilter,
        magFilter:     filtering || THREE.NearestFilter,
        wrapS:     THREE.RepeatWrapping,
        wrapT:     THREE.RepeatWrapping,
        format:        THREE.RGBAFormat,
        depthBuffer:   false,
        stencilBuffer: false,
        anisotropy:    1,
    });

    return {
        read:  rt1,
        write: rt2,
        swap: function() {
            let temp = this.read;
            this.read = this.write;
            this.write = temp;
        }
    };
}

let trailMap;
let particlesPosDir;
let particlesTextureSize = 1024;
let senseAndMovePass;
let depositPass;
let blurDecayPass;
let displayPass;
let splatTextureMaterial;
let quadPlaneMesh;
let particlesMesh;
function initMaterials() {
    particlesPosDir = createDoubleFBO(particlesTextureSize, particlesTextureSize, THREE.NearestFilter);
    trailMap        = createDoubleFBO(innerWidth, innerHeight, THREE.NearestFilter);

    senseAndMovePass = new THREE.ShaderMaterial({
        uniforms: {
            uTexelSize:       { value: 1 / particlesTextureSize },
            uScreenSize:      { value: new THREE.Vector2(innerWidth, innerHeight) },
            uParticlesPosDir: { type: "t", value: particlesPosDir.read.texture },
            uTrailMap:        { type: "t", value: trailMap.read.texture },
            uTime:            { value: 0.0 },
            dt:               { value: 0.0 },
        },
        vertexShader: particlesVert,
        fragmentShader: particlesFrag,
    });

    depositPass = new THREE.ShaderMaterial( {
        uniforms: {
            uTexelSize:       { value: 1 / particlesTextureSize },
            uScreenSize:      { value: new THREE.Vector2(innerWidth, innerHeight) },
            uParticlesPosDir: { type: "t", value: particlesPosDir.read.texture },
        },
        vertexShader: depositVert,
        fragmentShader: depositFrag,

        blending: THREE.CustomBlending,
        blendEquation: THREE.AddEquation,
        blendSrc: THREE.OneFactor,
        blendDst: THREE.OneFactor,
    });

    blurDecayPass = new THREE.ShaderMaterial( {
        uniforms: {
            uTexelSize:       { value: new THREE.Vector2(1 / innerWidth, 1 / innerHeight) },
            uTrailMap:        { type: "t", value: trailMap.read.texture },
            dt:               { value: 0.0 },
        },
        vertexShader: blurDecayVert,
        fragmentShader: blurDecayFrag,
    });

    displayPass = new THREE.ShaderMaterial( {
        uniforms: {
            uTrailMap:        { type: "t", value: trailMap.read.texture },
            dt:               { value: 0.0 },
        },
        vertexShader: displayVert,
        fragmentShader: displayFrag,
    });

    splatTextureMaterial = new THREE.ShaderMaterial( {
        uniforms: {
            uTexture: { type: "t", value: null },
        },
        vertexShader: splatTextureVert,
        fragmentShader: splatTextureFrag,
    });
    quadPlane = new THREE.PlaneBufferGeometry(2, 2);
    quadPlaneMesh = new THREE.Mesh(quadPlane, senseAndMovePass);
    groundScene.add(quadPlaneMesh);
}

function playPause() {
    running = !running
}

function animateGround(now) {
    const dt = calcDeltaTime();
    now *= 0.001;
    step(dt, now);
    requestAnimationFrame(animateGround);
}

let lastUpdateTime = Date.now();
function calcDeltaTime () {
    let now = Date.now();
    let dt = (now - lastUpdateTime) / 1000;
    dt = Math.min(dt, 0.016666);
    lastUpdateTime = now;
    return dt;
}

let count = 0;
let running = true;
function step(dt, now) {
    count++;
    if (running) {
        console.log(count)

        // ********* sense step - updates the pos/dir framebuffer ***********
        particlesMesh.material = senseAndMovePass;
        senseAndMovePass.uniforms.dt.value               = dt;
        senseAndMovePass.uniforms.uParticlesPosDir.value = particlesPosDir.read.texture;
        senseAndMovePass.uniforms.uTrailMap.value        = trailMap.read.texture;
        senseAndMovePass.uniforms.uTime.value            = now;
        groundRenderer.setRenderTarget(particlesPosDir.write);
        groundRenderer.clear();
        groundRenderer.render(particlesGround, camera);
        particlesPosDir.swap();
        // ********* sense step - updates the pos/dir framebuffer - END ***********

        // ********* deposit step - updates the trailmap framebuffer ***********
        particlesMesh.material = depositPass;
        depositPass.uniforms.uParticlesPosDir.value = particlesPosDir.read.texture;
        groundRenderer.setRenderTarget(trailMap.write);
        groundRenderer.render(particlesGround, camera);
        trailMap.swap();
        // ********* deposit step - updates the trailmap framebuffer - END ***********

        let blurPasses = 1;
        for(let i = 0; i < blurPasses; i++) {
            // ********* blur + decay step - updates the trailmap framebuffer ***********
            quadPlaneMesh.material = blurDecayPass;
            blurDecayPass.uniforms.dt.value               = dt;
            blurDecayPass.uniforms.uTrailMap.value        = trailMap.read.texture;
            groundRenderer.setRenderTarget(trailMap.write);
            groundRenderer.clear();
            groundRenderer.render(groundScene, camera);
            if(i < blurPasses - 1)
                trailMap.swap();
            // ********* blur + decay step - updates the trailmap framebuffer - END ***********
        }

        // make write and read trailmap equals
        splatTextureMaterial.uniforms.uTexture.value = trailMap.write.texture;
        quadPlaneMesh.material = splatTextureMaterial;
        groundRenderer.setRenderTarget(trailMap.read);
        groundRenderer.clear();
        groundRenderer.render(groundScene, camera);

        // ********* display pass ***********
        quadPlaneMesh.material = displayPass;
        displayPass.uniforms.dt.value               = dt;
        displayPass.uniforms.uTrailMap.value        = trailMap.read.texture;
        groundRenderer.setRenderTarget(null);
        groundRenderer.clear();
        groundRenderer.render(groundScene, camera);
        // ********* display pass - END ***********
    }
}

function initParticlesGeometry() {
    var geometry = new THREE.BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    var vertices = [];
    var verticesPos = [];

    for(let i = 0; i < particlesTextureSize; i++) {
        for(let j = 0; j < particlesTextureSize; j++) {
            let px = i;
            let py = j;

            vertices.push(px, py);
        }
    }

    for(let i = 0; i < particlesTextureSize; i++) {
        for(let j = 0; j < particlesTextureSize; j++) {
            verticesPos.push(i, j, 0);
        }
    }

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(verticesPos), 3 ) );
    geometry.setAttribute( 'aDataPos', new THREE.BufferAttribute( new Float32Array(vertices), 2 ) );
    particlesMesh = new THREE.Points( geometry, new THREE.MeshBasicMaterial({ }) );
    particlesMesh.frustumCulled = false;
    particlesGround.add(particlesMesh);
}

function initParticlesTexture() {
    let amount = particlesTextureSize * particlesTextureSize;
    let array = new Float32Array(4 * amount);

    for(let i = 0; i < amount * 4; i += 4) {

        let p  = new THREE.Vector2(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
        ).normalize().multiplyScalar(Math.random() * 300).add(new THREE.Vector2(innerWidth * 0.5, innerHeight * 0.5));

        let cp = new THREE.Vector2(innerWidth * 0.5, innerHeight * 0.5);

        // let v2 = new THREE.Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
        let v2 = p.clone().sub(cp).normalize();

        array[i + 0] = p.x;
        array[i + 1] = p.y;
        array[i + 2] = v2.x;
        array[i + 3] = v2.y;
    }

    let dataTex = new THREE.DataTexture(
        array,
        particlesTextureSize,
        particlesTextureSize,
        THREE.RGBAFormat,
        THREE.FloatType
    );

    splatTextureMaterial.uniforms.uTexture.value = dataTex;
    quadPlaneMesh.material = splatTextureMaterial;
    groundRenderer.setRenderTarget(particlesPosDir.read);
    groundRenderer.render(groundScene, camera);
    groundRenderer.setRenderTarget(particlesPosDir.write);
    groundRenderer.render(groundScene, camera);
}

function initTrailTexture() {
    let tsize = 512;
    let amount = tsize * tsize;
    let array = new Float32Array(4 * amount);

    for(let i = 0; i < amount * 4; i += 4) {

        let p  = new THREE.Vector2(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
        ).normalize().multiplyScalar(Math.random() * 300).add(new THREE.Vector2(innerWidth * 0.5, innerHeight * 0.5));

        let cp = new THREE.Vector2(innerWidth * 0.5, innerHeight * 0.5);

        // let v2 = new THREE.Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
        let v2 = p.clone().sub(cp).normalize();

        array[i + 0] = p.length();
        array[i + 1] = p.length();
        array[i + 2] = v2.x;
        array[i + 3] = v2.y;
    }

    let dataTex = new THREE.DataTexture(
        array,
        tsize,
        tsize,
        THREE.RGBAFormat,
        THREE.FloatType
    );

    splatTextureMaterial.uniforms.uTexture.value = dataTex;
    quadPlaneMesh.material = splatTextureMaterial;
    groundRenderer.setRenderTarget(trailMap.read);
    groundRenderer.render(groundScene, camera);
    groundRenderer.setRenderTarget(trailMap.write);
    groundRenderer.render(groundScene, camera);
}
