varying vec2 vUv;
uniform sampler2D tExplosion;
//varying vec3 vReflect;
varying vec3 pos;
varying float ao;
varying float d;

uniform float start_time;
uniform float current_time;
uniform float time_shift;
uniform float duration;

float PI = 3.14159265358979323846264;

float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}

void main() {

  vec3 color = texture2D( tExplosion, vec2( 0, 1.0 - 1.3 * ao + .01 * random(vec3(12.9898,78.233,151.7182),0.0) ) ).rgb;
  //color = vec3(1.0,0.0,0.0);
  gl_FragColor = vec4( color.rgb, 3.0 - (current_time - start_time) * 3.0/duration );
  //gl_FragColor = vec4( 1.0,0,0, 0.5 );

}