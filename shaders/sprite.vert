precision mediump float;
attribute vec3 customColor;
attribute vec2 texCoord;
attribute float currentTime;
uniform float framesNumber;
uniform float frameTime;

varying vec3 vColor;
varying vec2 texc;

void main() {

  vColor = customColor;
  
  //texc processing
  
  float current_frame = floor(currentTime / frameTime);
  
  if(framesNumber > 1.0)
  {
    texc = vec2((current_frame + texCoord.x) / framesNumber, texCoord.y);
  }
  else
  {
    texc = texCoord;
  }

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

  gl_Position = projectionMatrix * mvPosition;

}