attribute vec2 texCoord;

varying vec2 texc;
varying vec3 pos;

void main() {

	texc = texCoord;
	
	pos = position.xyz;
	
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

	gl_Position = projectionMatrix * mvPosition;

}	