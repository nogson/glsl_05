#ifdef GL_ES
precision mediump float;
#endif
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform sampler2D textuer;
varying vec2 vUv;


void main(){
	gl_FragColor = texture2D(textuer, vUv); 
}