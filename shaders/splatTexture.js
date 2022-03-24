let splatTextureVert = `
varying vec2 vUv;

void main() {
    vUv = position.xy * 0.5 + 0.5;
    //if (position.xy < .5) {
    gl_Position = vec4(position.xy, 0.0, 1.0);
    //} else {
    // gl_Position = vec4(vec3(.5, .5, .5), 0.0, 1.0);
    //}
}
`;


let splatTextureFrag = `
uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
    gl_FragColor = texture2D(uTexture, vUv);
}
`;


