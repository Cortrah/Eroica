var camera;
var scene;
var renderer;
var cubeMesh;
var clock;
var deltaTime;
var particleEpisodes;

init();
animateEpisodes();

function init() {

    window.episodes = [
        { x:"120", y:"40",  code:"act1_v1_n1", glimmer:"Promptings and seizures", img:"node", status:"not-visited"},
        { x:"144", y:"20",  code:"act1_v1_n2", glimmer:"Sounding brass", img:"node",  status:"not-visited"},
        { x:"175", y:"10",  code:"act1_v1_n3", glimmer:"A whited sepulcher", img:"node",  status:"not-visited"},
        { x:"210", y:"5",  code:"act1_v1_n4", glimmer:"Demon dance of the new", img:"node",  status:"not-visited"},
        { x:"155", y:"55",  code:"act1_v1_p1", glimmer:"Window mirror eye", img:"node",  status:"not-visited"},
        { x:"190", y:"45",  code:"act1_v1_p2", glimmer:"Wings and talons", img:"node",  status:"not-visited"},
        { x:"185", y:"82", code:"act1_v1_m1", glimmer:"A puddle of tallow", img:"node",  status:"not-visited"},
        { x:"325", y:"-35",  code:"act1_t1_n1", glimmer:"The consummate design", img:"node",  status:"not-visited"},
        { x:"358", y:"-40",  code:"act1_t1_n2", glimmer:"Ahh skin ...", img:"node",  status:"not-visited"},
        { x:"390", y:"-40",  code:"act1_t1_n3", glimmer:"Paint the frieze", img:"node",  status:"not-visited"},
        { x:"425", y:"-35",  code:"act1_t1_n4", glimmer:"Build the temple", img:"node",  status:"not-visited"},
        { x:"356", y:"-5",  code:"act1_t1_p1", glimmer:"Dream brothers", img:"node",  status:"not-visited"},
        { x:"392", y:"-5",  code:"act1_t1_p2", glimmer:"Rubblous ghouls", img:"node",  status:"not-visited"},
        { x:"375", y:"25", code:"act1_t1_m1", glimmer:"An eye, sire", img:"node",  status:"not-visited"},
        { x:"560", y:"-10",  code:"act1_a1_n1", glimmer:"Look to mozart", img:"node",  status:"not-visited"},
        { x:"592", y:"-2",  code:"act1_a1_n2", glimmer:"Faithful to measure", img:"node",  status:"not-visited"},
        { x:"622", y:"14",  code:"act1_a1_n3", glimmer:"We know not", img:"node",  status:"not-visited"},
        { x:"642", y:"43",  code:"act1_a1_n4", glimmer:"act1_a1_n4", img:"node",  status:"not-visited"},
        { x:"570", y:"30",  code:"act1_a1_p1", glimmer:"act1_a1_p1", img:"node",  status:"not-visited"},
        { x:"600", y:"50",  code:"act1_a1_p2", glimmer:"act1_a1_p2", img:"node",  status:"not-visited"},
        { x:"570", y:"70", code:"act1_a1_m1", glimmer:"act1_a1_m1", img:"node",  status:"not-visited"},
        { x:"170", y:"140", code:"act1_v2_n1", glimmer:"act1_v2_n1", img:"node",  status:"not-visited"},
        { x:"200",  y:"125", code:"act1_v2_n2", glimmer:"act1_v2_n2", img:"node",  status:"not-visited"},
        { x:"235",  y:"120", code:"act1_v2_n3", glimmer:"act1_v2_n3", img:"node",  status:"not-visited"},
        { x:"270",  y:"122", code:"act1_v2_n4", glimmer:"act1_v2_n4", img:"node",  status:"not-visited"},
        { x:"205",  y:"160", code:"act1_v2_p1", glimmer:"act1_v2_p1", img:"node",  status:"not-visited"},
        { x:"240",  y:"150", code:"act1_v2_p2", glimmer:"act1_v2_p2", img:"node",  status:"not-visited"},
        { x:"227",  y:"185", code:"act1_v2_m1", glimmer:"act1_v2_m1", img:"node",  status:"not-visited"},
        { x:"330",  y:"100", code:"act1_t2_n1", glimmer:"act1_t2_n1", img:"node",  status:"not-visited"},
        { x:"365",  y:"95", code:"act1_t2_n2", glimmer:"act1_t2_n2", img:"node",  status:"not-visited"},
        { x:"400",  y:"95", code:"act1_t2_n3", glimmer:"act1_t2_n3", img:"node",  status:"not-visited"},
        { x:"435",  y:"100", code:"act1_t2_n4", glimmer:"act1_t2_n4", img:"node",  status:"not-visited"},
        { x:"360",  y:"130", code:"act1_t2_p1", glimmer:"act1_t2_p1", img:"node",  status:"not-visited"},
        { x:"400",  y:"130", code:"act1_t2_p2", glimmer:"act1_t2_p2", img:"node",  status:"not-visited"},
        { x:"385",  y:"165", code:"act1_t2_m1", glimmer:"act1_t2_m1", img:"node",  status:"not-visited"},
        { x:"500",  y:"115", code:"act1_a2_n1", glimmer:"act1_a2_n1", img:"node",  status:"not-visited"},
        { x:"535",  y:"115", code:"act1_a2_n2", glimmer:"act1_a2_n2", img:"node",  status:"not-visited"},
        { x:"570",  y:"125", code:"act1_a2_n3", glimmer:"act1_a2_n3", img:"node",  status:"not-visited"},
        { x:"600",  y:"138", code:"act1_a2_n4", glimmer:"act1_a2_n4", img:"node",  status:"not-visited"},
        { x:"520",  y:"155", code:"act1_a2_p1", glimmer:"act1_a2_p1", img:"node",  status:"not-visited"},
        { x:"560",  y:"160", code:"act1_a2_p2", glimmer:"act1_a2_p2", img:"node",  status:"not-visited"},
        { x:"538",  y:"188", code:"act1_a2_m1", glimmer:"act1_a2_m1", img:"node",  status:"not-visited"},
        { x:"150",  y:"300", code:"act1_v3_n1", glimmer:"act1_v3_n1", img:"node",  status:"not-visited"},
        { x:"185",  y:"288", code:"act1_v3_n2", glimmer:"act1_v3_n2", img:"node",  status:"not-visited"},
        { x:"220",  y:"280", code:"act1_v3_n3", glimmer:"act1_v3_n3", img:"node",  status:"not-visited"},
        { x:"255",  y:"280", code:"act1_v3_n4", glimmer:"act1_v3_n4", img:"node",  status:"not-visited"},
        { x:"185",  y:"330", code:"act1_v3_p1", glimmer:"act1_v3_p1", img:"node",  status:"not-visited"},
        { x:"220",  y:"320", code:"act1_v3_p2", glimmer:"act1_v3_p2", img:"node",  status:"not-visited"},
        { x:"215",  y:"360", code:"act1_v3_m1", glimmer:"act1_v3_m1", img:"node",  status:"not-visited"},
        { x:"330",  y:"240", code:"act1_t3_n1", glimmer:"act1_t3_n1", img:"node",  status:"not-visited"},
        { x:"365",  y:"230", code:"act1_t3_n2", glimmer:"act1_t3_n2", img:"node",  status:"not-visited"},
        { x:"400",  y:"230", code:"act1_t3_n3", glimmer:"act1_t3_n3", img:"node",  status:"not-visited"},
        { x:"435",  y:"240", code:"act1_t3_n4", glimmer:"act1_t3_n4", img:"node",  status:"not-visited"},
        { x:"360",  y:"270", code:"act1_t3_p1", glimmer:"act1_t3_p1", img:"node",  status:"not-visited"},
        { x:"400",  y:"270", code:"act1_t3_p2", glimmer:"act1_t3_p2", img:"node",  status:"not-visited"},
        { x:"380",  y:"310", code:"act1_t3_m1", glimmer:"act1_t3_m1", img:"node",  status:"not-visited"},
        { x:"515",  y:"275", code:"act1_a3_n1", glimmer:"act1_a3_n1", img:"node",  status:"not-visited"},
        { x:"550",  y:"280", code:"act1_a3_n2", glimmer:"act1_a3_n2", img:"node",  status:"not-visited"},
        { x:"580",  y:"295", code:"act1_a3_n3", glimmer:"act1_a3_n3", img:"node",  status:"not-visited"},
        { x:"602",  y:"322", code:"act1_a3_n4", glimmer:"act1_a3_n4", img:"node",  status:"not-visited"},
        { x:"520",  y:"310", code:"act1_a3_p1", glimmer:"act1_a3_p1", img:"node",  status:"not-visited"},
        { x:"560",  y:"325", code:"act1_a3_p2", glimmer:"act1_a3_p2", img:"node",  status:"not-visited"},
        { x:"520",  y:"350", code:"act1_a3_m1", glimmer:"act1_a3_m1", img:"node",  status:"not-visited"},
        { x:"190",  y:"540", code:"act2_v4_h",  glimmer:"act2_v4_h", img:"left",  status:"not-visited"},
        { x:"215",  y:"540", code:"act2_v4_s",  glimmer:"act2_v4_s", img:"right", status:"not-visited"},
        { x:"255",  y:"550", code:"act2_v5_h",  glimmer:"act2_v5_h", img:"left",  status:"not-visited"},
        { x:"280",  y:"550", code:"act2_v5_s",  glimmer:"act2_v5_s", img:"right", status:"not-visited"},
        { x:"320",  y:"560", code:"act2_v6_h",  glimmer:"act2_v6_h", img:"left",  status:"not-visited"},
        { x:"350",  y:"560", code:"act2_v6_s",  glimmer:"act2_v6_s", img:"right", status:"not-visited"},
        { x:"305",  y:"490", code:"act2_t4_h",  glimmer:"act2_t4_h", img:"left",  status:"not-visited"},
        { x:"335",  y:"490", code:"act2_t4_s",  glimmer:"act2_t4_s", img:"right", status:"not-visited"},
        { x:"380",  y:"485", code:"act2_t5_h",  glimmer:"act2_t5_h", img:"left",  status:"not-visited"},
        { x:"410",  y:"485", code:"act2_t5_s",  glimmer:"act2_t5_s", img:"right", status:"not-visited"},
        { x:"455",  y:"490", code:"act2_t6_h",  glimmer:"act2_t6_h", img:"left",  status:"not-visited"},
        { x:"485",  y:"490", code:"act2_t6_s",  glimmer:"act2_t6_s", img:"right", status:"not-visited"},
        { x:"430",  y:"560", code:"act2_a4_h",  glimmer:"act2_a4_h", img:"left",  status:"not-visited"},
        { x:"460",  y:"560", code:"act2_a4_s",  glimmer:"act2_a4_s", img:"right", status:"not-visited"},
        { x:"500",  y:"555", code:"act2_a5_h",  glimmer:"act2_a5_h", img:"left",  status:"not-visited"},
        { x:"530",  y:"555", code:"act2_a5_s",  glimmer:"act2_a5_s", img:"right", status:"not-visited"},
        { x:"570",  y:"550", code:"act2_a6_h",  glimmer:"act2_a6_h", img:"left",  status:"not-visited"},
        { x:"600",  y:"550", code:"act2_a6_s",  glimmer:"act2_a6_s", img:"right", status:"not-visited"},
        { x:"280",  y:"645", code:"act3_v_h",   glimmer:"act3_v_h", img:"left",  status:"not-visited"},
        { x:"310",  y:"650", code:"act3_v_s",   glimmer:"act3_v_s", img:"right", status:"not-visited"},
        { x:"380",  y:"650", code:"act3_t_h",   glimmer:"act3_t_h", img:"left",  status:"not-visited"},
        { x:"410",  y:"650", code:"act3_t_s",   glimmer:"act3_t_s", img:"right", status:"not-visited"},
        { x:"480",  y:"650", code:"act3_a_h",   glimmer:"act3_a_h", img:"left",  status:"not-visited"},
        { x:"510",  y:"645", code:"act3_a_s",   glimmer:"act3_a_s", img:"right", status:"not-visited"},
        { x:"375",  y:"810", code:"finale",     glimmer:"finale", img:"scarab",status:"not-visited"}
    ]
    clock = new THREE.Clock(true);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 50;

    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, -1, 1 ).normalize();
    scene.add(light);

    var geometry = new THREE.CubeGeometry( 10, 10, 10);
    var material = new THREE.MeshPhongMaterial( { color: 0x0033ff, specular: 0x555555, shininess: 30 } );

    cubeMesh = new THREE.Mesh(geometry, material );
    cubeMesh.position.z = -30;
    scene.add( cubeMesh );

    particleEpisodes = createparticleEpisodes();
    scene.add(particleEpisodes);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    render();
}

function animateEpisodes() {
    deltaTime = clock.getDelta();
    cubeMesh.rotation.x += 1 * deltaTime;
    cubeMesh.rotation.y += 2 * deltaTime;
    render();
    requestAnimationFrame( animateEpisodes );
}

function render() {
    renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
}

function createparticleEpisodes() {
    var particleCount = 2000;

    // Create the geometry that will hold all of the vertices
    var particles = new THREE.Geometry();

    // Create the vertices and add them to the particles geometry
    for (var e = 0; e < episodes.length; e++) {

        var x = episodes[e].x/10 - 40;
        var y = episodes[e].y/10 - 40;
        var z = -30;
        console.log(x)
        console.log(y)

        // Create the vertex
        var particle = new THREE.Vector3(x, -y, z);

        // Add the vertex to the geometry
        particles.vertices.push(particle);
    }

    // Create the material that will be used to render each vertex of the geometry
    var particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
            size: 4,
            map: THREE.ImageUtils.loadTexture("img/ur/notVisited.png"),
            blending: THREE.AdditiveBlending,
            transparent: true,
        });

    // Create the particle system
    particleEpisodes = new THREE.Points(particles, particleMaterial);
    return particleEpisodes;
}

function animateParticles() {
    var verts = particleEpisodes.geometry.vertices;
    for(var i = 0; i < verts.length; i++) {
        var vert = verts[i];
        if (vert.y < -200) {
            vert.y = Math.random() * 400 - 200;
        }
        vert.y = vert.y - (10 * deltaTime);
    }
    particleEpisodes.geometry.verticesNeedUpdate = true;
}
particleEpisodes = createparticleEpisodes();
scene.add(particleEpisodes);

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
    scene.add(quadPlaneMesh);
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
            groundRenderer.render(scene, camera);
            if(i < blurPasses - 1)
                trailMap.swap();
            // ********* blur + decay step - updates the trailmap framebuffer - END ***********
        }

        // make write and read trailmap equals
        splatTextureMaterial.uniforms.uTexture.value = trailMap.write.texture;
        quadPlaneMesh.material = splatTextureMaterial;
        groundRenderer.setRenderTarget(trailMap.read);
        groundRenderer.clear();
        groundRenderer.render(scene, camera);

        // ********* display pass ***********
        quadPlaneMesh.material = displayPass;
        displayPass.uniforms.dt.value               = dt;
        displayPass.uniforms.uTrailMap.value        = trailMap.read.texture;
        groundRenderer.setRenderTarget(null);
        groundRenderer.clear();
        groundRenderer.render(scene, camera);
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
    groundRenderer.render(scene, camera);
    groundRenderer.setRenderTarget(particlesPosDir.write);
    groundRenderer.render(scene, camera);
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
    groundRenderer.render(scene, camera);
    groundRenderer.setRenderTarget(trailMap.write);
    groundRenderer.render(scene, camera);
}
