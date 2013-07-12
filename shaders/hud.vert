precision mediump float;
attribute vec2 texCoord;

varying vec2 texc;

void main() {

  texc = texCoord;

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

  gl_Position = projectionMatrix * mvPosition;

}