function Shield(){


	this.Attributes  = {

		};
		
	this.Uniforms = {

			hull:   { type: "f", value: 0.0 },
			energy:   { type: "f", value: 0.0 },
			hit_pos: { type: 'fv', value: [] },
			time:   { type: "f", value: 0.0 },
			
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
	

	
	this.shaderMaterial.depthWrite = false;
				
	this.mesh = new THREE.Mesh( new THREE.IcosahedronGeometry( 1.0, 2 ), this.shaderMaterial );
			
	//this.Uniforms.bonePos.value[0] = 0.5;
	//this.Uniforms.bonePos.value[1] = 1.3;
	
	this.mesh.scale.x = 2.5; //3
	this.mesh.scale.y = 2.5;  //3
	this.mesh.scale.z = 3.2;  //4

	this.timeDirectin = true;
	this.timeMaxValue = 3.0;
	
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
}