uniform sampler2D texture;

varying vec3 vColor;
varying vec2 texc;

void main() {

  gl_FragColor = vec4( vColor, 1.0 );
  vec4 intensity = texture2D( texture, texc );
  gl_FragColor = gl_FragColor * intensity ;

}