precision mediump float;
uniform sampler2D texture;
uniform float hull;
uniform float energy; 

varying vec2 texc;

float PI = 3.14159265358979323846264;

void main() {

  //vec4 intensity = texture2D( texture, texc );
  
  float radius = sqrt(texc.y * texc.y  + texc.x * texc.x);
  
  if(radius < 0.7)
  {
    gl_FragColor.rgb = vec3(0.0, 0.8, 1.0) * (1.0 - radius * radius * 1.6) * (energy + 0.35);
    gl_FragColor.w = 1.0 * energy + (1.0 - radius * radius * 1.6);
  }
  else if(radius < 0.95)
  {
    radius -= 0.825;
    radius = abs(radius);
    
    vec2 tex_vec = normalize(texc);
    float angle = asin(tex_vec.y);
    
    if(angle < PI / 2.0 * hull)
    {
      gl_FragColor.rgb = vec3(0.9 , 0.1, 0.1) * (1.0 - (radius * radius * radius) * 400.0) * (angle);
      gl_FragColor.w = 0.95;
    }
    else
    {
      gl_FragColor = vec4(0.0,0.0,0.0,0.1);
    }         
  }
  else 
  {
    gl_FragColor = vec4(0.0,0.0,0.0,0.0);
  }

}