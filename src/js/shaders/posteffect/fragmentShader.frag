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

/**
 * ランダムな値を作る
 */

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    vec2 position = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x,resolution.y);
    float maxX = 1.0;
    float maxY = 1.0;
    float lines = 5.0;

    if(resolution.x > resolution.y){
        maxY = 1.0;
        maxX = resolution.x / resolution.y;
    }else{
        maxY = resolution.y / resolution.x;
        maxX = 1.0;
    }

    //vec3 destColor = drowCircle (position, vec2(-1.0), 0.2,vec3(1.0));
    vec3 destColor = vec3(0.0);
    float h = (maxY * 2.0) * (maxY / lines);
    // float r = rand(vec2(yy)) + sin(time * rand(vec2(yy)) * 2.0);
    float r = 1.0;
 

    //destColor =  vec3(mod(position.y , h));
    for(float i = 0.0; i < 5.0; i+=1.0){
      float a = mod(i,2.0);
        float y = (maxY * -1.0) + h * i;
        float r = rand(vec2(y)) + sin(time * rand(vec2(y)) * 2.0);
        float x = maxX * -1.0;
        float w = maxX * 2.0 + sin(time * rand(vec2(y)) * 2.0);
        destColor += drawRect(position, vec2(x, y), vec2(w,h * 1.0), vec3(1.0));
    }

    gl_FragColor = vec4(destColor,1.0);
	// vec4 color = texture2D(tDiffuse, vec2(vUv.x - destColor.r * 0.05  ,vUv.y )); 
    // color = vec4(vec3((color.r + color.g + color.b)/3.0 * 1.5),1.0);
    // gl_FragColor = vec4(color.r * vUv.x,color.g * vUv.y,0.5,1.0);
}


