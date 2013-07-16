function Shield(){


	this.Attributes  = {

		};
		
	this.Uniforms = {

			hull:   { type: "f", value: 0.0 },
			energy:   { type: "f", value: 0.0 },
			hit_pos: { type: 'v4v', value: [new THREE.Vector4( 0.0, 0.0, 0.0, 0.0 ), 
                                       		new THREE.Vector4( 0.0, 0.0, 0.0, 0.0 ),
                                       		new THREE.Vector4( 0.0, 0.0, 0.0, 0.0 ),
                                       		new THREE.Vector4( 0.0, 0.0, 0.0, 0.0 )] },
			time:   { type: "f", value: 0.0 },
			hit_effect_time:   { type: "f", value: 0.4 },
			
		};
	
	

	this.shaderMaterial = new THREE.ShaderMaterial( {

		uniforms: 		this.Uniforms,
		attributes:     this.Attributes ,
    	vertexShader:   shaders["shield"].vertex,
    	fragmentShader: shaders["shield"].fragment,

		//blending: 		THREE.AdditiveBlending,
		dynamic:        true,
		depthTest: 		false,
		transparent:	true

	});
	

	//this.shaderMaterial.side = THREE.DoubleSide;
	this.shaderMaterial.depthWrite = false;
				
	this.mesh = new THREE.Mesh( new THREE.IcosahedronGeometry( 1.0, 2 ), this.shaderMaterial );
			
	//this.Uniforms.bonePos.value[0] = 0.5;
	//this.Uniforms.bonePos.value[1] = 1.3;
	
	this.mesh.scale.x = 2.5; //3
	this.mesh.scale.y = 2.5;  //3
	this.mesh.scale.z = 3.2;  //4

	this.timeDirectin = true;
	this.timeMaxValue = 3.0;

	this.maxHitCount = 4;
	this.hitEffectTime = this.Uniforms.hit_effect_time.value;

	this.nextHitSlot = 0;
	
}

Shield.prototype.updateTime = function(deltaTime){
	if(this.timeDirectin){
		this.Uniforms.time.value += deltaTime;
		if( this.Uniforms.time.value >= this.timeMaxValue ){
			this.Uniforms.time.value = this.timeMaxValue;
			this.timeDirectin = false;
		}
	}
	else{
		this.Uniforms.time.value -= deltaTime;
		if( this.Uniforms.time.value <= 0.0 ){
			this.Uniforms.time.value = 0.0;
			this.timeDirectin = true;
		}
	}

	for(var i = 0; i < this.maxHitCount; i++){
		this.Uniforms.hit_pos.value[i].w -= deltaTime;
		if ( this.Uniforms.hit_pos.value[i].w < 0.0 ) this.Uniforms.hit_pos.value[i].w = 0.0;
	}
}

Shield.prototype.addHit = function(position){


	this.Uniforms.hit_pos.value[this.nextHitSlot].x = position.x;
	this.Uniforms.hit_pos.value[this.nextHitSlot].z = position.z;

	this.Uniforms.hit_pos.value[this.nextHitSlot].y = (Math.random() * 2.0 - 1.0) * 1.5;

	this.Uniforms.hit_pos.value[this.nextHitSlot].w = this.hitEffectTime;

	this.nextHitSlot++;

	this.nextHitSlot = this.nextHitSlot % this.maxHitCount;
}