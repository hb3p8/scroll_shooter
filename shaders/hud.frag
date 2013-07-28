precision mediump float;
uniform sampler2D texture;
uniform float hull;
uniform float energy; 

varying vec2 texc;

float PI = 3.14159265358979323846264;

// #define ALTERN_HUD 1

void main() {

  float radius = sqrt(texc.y * texc.y  + texc.x * texc.x);
#ifdef ALTERN_HUD 
  gl_FragColor = vec4(0.0,0.0,0.0,0.0);
  
  float t = 1.5 - radius;

  t = pow(t, 12.0) * energy;
  gl_FragColor.rgb += t * vec3( 0.9, 0.9, 0.99 );
  gl_FragColor.w = t;
  gl_FragColor.rgb += (1.0 - radius*radius) * vec3( 0.05, 0.05, 0.90 );

  float v = radius < 0.78 ? 1.0 : smoothstep(0.8, 0.78, radius);
  v = radius > 0.64 ? v : smoothstep(0.62, 0.64, radius);

  vec2 tex_vec = normalize(texc);
  float angle = asin(tex_vec.y);
  float angleFactor = 0.5 + 0.5*sin(angle*18.0); 
  v *= smoothstep(0.1, 0.3, angleFactor);
  if(angle < PI / 2.0 * hull)
  {
    gl_FragColor.rgb += v * vec3(0.0, 0.3, 0.0);
    gl_FragColor.w += v*v;
  }
#else

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
#endif

}