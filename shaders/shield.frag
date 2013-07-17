uniform sampler2D texture;

varying vec2 texc;
varying vec3 pos;

#define hit_pos_count 4

#define blinking
#define wave_effect

uniform vec4 hit_pos [hit_pos_count];
uniform float time;
uniform float hit_effect_time;

uniform float frame; // for blinking

//vec3 shot_pos = normalize(vec3(1.0,0.7,1.0));

float hash( float n ) { return fract(sin(n)*43758.5453123); }
float noise( in vec3 x )
{
	vec3 p = floor(x);
	vec3 f = fract(x);
	f = f*f*(3.0-2.0*f);
	
	float n = p.x + p.y*157.0 + 113.0*p.z;
	return mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
				   mix( hash(n+157.0), hash(n+158.0),f.x),f.y),
			   mix(mix( hash(n+113.0), hash(n+114.0),f.x),
				   mix( hash(n+270.0), hash(n+271.0),f.x),f.y),f.z);
}

const mat3 m = mat3( 0.00,  0.80,  0.60,
        -0.80,  0.36, -0.48,
        -0.60, -0.48,  0.64 );

void main() {


	float occ = 0.8;
	vec3 col = vec3(0.9);

	float f = 0.1;
	
	vec3 q = (3.5 + time/2.0) * pos ;
	f  = 0.5000*noise( q ); q = m*q*2.04 * abs(time / 4.0);
	f += 0.2500*noise( q ); q = m*q*2.02;
	//f += 0.1250*noise( q ); q = m*q*2.03;
	//f += 0.0625*noise( q ); q = m*q*2.01;

	f = cos((pos.y+f) * 10.);
	
	f *= occ;
	col = vec3(f*1.2);

	col = sqrt( col );
	
	col *= vec3(0.1,0.8,1.0);
	
	float alpha = 0.0;

	float time_norm;
	float radius ;

	for(int i = 0; i < hit_pos_count; i++)
	{
		if(hit_pos[i].w > 0.0)
		{
			time_norm = (hit_pos[i].w / hit_effect_time); // 0..1 
			radius = length( normalize(hit_pos[i].xyz) - pos );



			#ifdef wave_effect

			if(radius > (1.0 - time_norm))
				alpha += (clamp((1.5 - radius * radius * 1.2 ), 0.0, 1.0) * 1.5 ) * time_norm;

			#endif

			#ifndef wave_effect

			alpha += (clamp((1.5 - radius * radius * 1.1 ), 0.0, 1.0) * 1.3 ) * time_norm;

			#endif

			#ifdef blinking

			alpha *= (mod(frame , 3.0) + 0.2) / 3.0;

			#endif
		}

			
	}

	

	gl_FragColor = vec4( col, /*(clamp((1.0 - pow(length(shot_pos - pos),2.0) ), 0.0, 1.0)*1.3 + 0.04)* length(col)*/ alpha );
			
}