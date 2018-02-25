#ifdef GL_ES
precision mediump float;
#endif
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)


uniform sampler2D tDiffuse;
uniform vec2 resolution;
uniform float time;
varying vec2 vUv;
varying vec3 pos;


/**
 * 円を描く
 * @param {vec2} position 正規化された座標
 * @param {vec2} offset 円の原点
 * @param {vec2} size　半径
 * @param {vec3} color 描画する色
 * @return {vec3} 描画色 
 */

vec3 drowCircle(vec2 position, vec2 offset, float size, vec3 color) {
    float len = length(position - offset);
    vec3 c = vec3(0.0);
    if (len < size) {
        c = color;
    }

    return c;
}

/**
 * 矩形を描く
 * @param {vec2} position 正規化された座標
 * @param {vec2} offset 矩形の左下の座標
 * @param {vec2} size　縦横サイズ
 * @param {vec3} color 描画する色
 * @return {vec3} 描画色 
 */

vec3 drawRect( vec2 position, vec2 offset, vec2 size, vec3 color ) {
    vec3 c = vec3(0.0);
    vec2 min = offset;
    vec2 max = offset + size;
    bool boolX = min.x < position.x && position.x < max.x;
    bool boolY = min.y < position.y && position.y < max.y;
    if( boolX && boolY ) {
        c = color;
    }
    return c;
}


void main() {
  vec2 position = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x,resolution.y);

    //vec3 destColor = drowCircle (position, vec2(-1.0), 0.2,vec3(1.0));

    vec3 destColor = drawRect(position, vec2(-0.5), vec2(1.,0.1), vec3(1.0)) * 0.01;

    //gl_FragColor = vec4(destColor,1.0);
	gl_FragColor = texture2D(tDiffuse, vec2(vUv.x + destColor.r,vUv.y + destColor.g)); 
}