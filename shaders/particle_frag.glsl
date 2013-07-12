uniform vec3 color;
uniform sampler2D texture;

varying vec3 vColor;

void main() {

  gl_FragColor = vec4( color * vColor, 1.0 );
  vec2 t = gl_PointCoord;
  // float angle = 3.1415 / 3.;
  // float s = sin(angle);
  // float c = cos(angle);
  // t -= vec2(0.5, 0.5);
  // t = vec2(t.x * c - t.y * s, t.x * s + t.y * c);
  // t += vec2(0.5, 0.5);
  vec4 intensity = texture2D( texture, t );
  gl_FragColor = gl_FragColor * intensity * intensity * intensity * 2. ;

}