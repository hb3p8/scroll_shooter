function ExplosionManager(scene,maxExplosions){

	this.maxExplosions = maxExplosions;

	this.explosionGeometry = new THREE.IcosahedronGeometry( 15, 4 );

	this.explosionArray = [];

	for (var i = 0; i < maxExplosions; i++ )
	{
		var newExplosion = new Explosion(this.explosionGeometry);

		newExplosion.mesh.visible = false;

		newExplosion.mesh.scale.x = 1.0/10.0;
		newExplosion.mesh.scale.y = 1.0/10.0;
		newExplosion.mesh.scale.z = 1.0/10.0;

		scene.add(newExplosion.mesh);

		this.explosionArray.push( newExplosion );
	}
	


}



ExplosionManager.prototype.addExplosion = function(minRadius, maxRadius, pos, duration){

	for(var i = 0; i < this.maxExplosions; i++)
	{
		if (this.explosionArray[i].mesh.visible == false || i === (this.maxExplosions - 1))
		{
			this.explosionArray[i].mesh.visible = true;

			/*this.explosionArray[i].minRadius = minRadius;
			this.explosionArray[i].maxRadius = maxRadius;
			this.explosionArray[i].explosionDuration = time;*/

			this.explosionArray[i].Uniforms.min_radius.value = minRadius;
			this.explosionArray[i].Uniforms.max_radius.value = maxRadius;
			this.explosionArray[i].Uniforms.duration.value = duration;
			this.explosionArray[i].Uniforms.start_time.value = clock.oldTime;
			this.explosionArray[i].Uniforms.current_time.value = clock.oldTime;
			this.explosionArray[i].Uniforms.time_shift.value = Math.random() * (100.0 - 10.0) + 10.0;

			this.explosionArray[i].mesh.position = pos;

			break;
		}


	}

}


function Explosion(geometry){

	/*

	uniform float start_time;
	uniform float current_time;
	uniform float max_radius;
	uniform float min_radius;
	uniform float time_shift;

	*/

	this.Attributes  = {

	};

	this.Uniforms = {

		tExplosion: { type: "t", value: THREE.ImageUtils.loadTexture( 'sprites/explosion.png' ) },
		weight: { type: "f", value: 10.0 },
		start_time: { type: "f", value: 0.0 },
		current_time: { type: "f", value: 0.0 },
		time_shift: { type: "f", value: 0.0 },
		max_radius: { type: "f", value: 0.0 },
		min_radius: { type: "f", value: 0.0 },
		duration: { type: "f", value: 0.0 }

	};



	this.shaderMaterial = new THREE.ShaderMaterial( {

	uniforms:     this.Uniforms,
	attributes:     this.Attributes ,
	vertexShader:   shaders["explosion"].vertex,
	fragmentShader: shaders["explosion"].fragment,

	blending:     THREE.AdditiveBlending,
	dynamic:        false,
	depthTest:    true,
	transparent:  true,
	//side:          THREE.DoubleSide

	});

	this.mesh = new THREE.Mesh( geometry, this.shaderMaterial );

	/*this.minRadius = 0.0;
	this.maxRadius = 0.0;
	this.explosionDuration = 0;
	this.start_time = 0;
*/
}

ExplosionManager.prototype.update = function(deltaTime){
	for(var i = 0; i < this.maxExplosions; i++)
	{
		if(this.explosionArray[i].mesh.visible == true)
		{
			this.explosionArray[i].Uniforms.current_time.value += deltaTime;

			//console.log(this.explosionArray[i].Uniforms.current_time.value - this.explosionArray[i].Uniforms.start_time.value);

			if( (this.explosionArray[i].Uniforms.current_time.value 
				- this.explosionArray[i].Uniforms.start_time.value) > this.explosionArray[i].Uniforms.duration.value)
			{
				this.explosionArray[i].mesh.visible = false;
			}
		}
	}
}