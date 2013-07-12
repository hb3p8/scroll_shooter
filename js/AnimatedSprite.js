function AnimatedSprite(textureName){


  this.spriteAttributes  = {

      customColor: {  type: 'v3', value: [] },
      texCoord: { type: 'v2', value: [] },
      currentTime: { type: 'f', value: [] }

    };
    
  this.spriteUniforms = {

      texture:   { type: "t", value: THREE.ImageUtils.loadTexture( textureName ) },
      framesNumber:   { type: "f", value: 1.0 },
      frameTime:   { type: "f", value: 0.0 }

    };
  
  

  this.shaderMaterial = new THREE.ShaderMaterial( {

    uniforms:     this.spriteUniforms,
    attributes:     this.spriteAttributes ,
    vertexShader:   shaders["sprite"].vertex,
    fragmentShader: shaders["sprite"].fragment,

    //blending:     THREE.AdditiveBlending,
    dynamic:        true,
    depthTest:    false,
    transparent:  true

  });
  
  this.shaderMaterial.depthWrite = false;
  
  
  this.textureName = '';
  this.animationTime = 0;
  this.framesNumber = 1;
  this.frameTime = 0;
  
  this.geometry = new THREE.Geometry();
  this.vertices = this.geometry.vertices;
  this.colors = this.spriteAttributes.customColor.value;
  this.texCoords = this.spriteAttributes.texCoord.value;
  this.faces = this.geometry.faces;
  
  this.currentTime = this.spriteAttributes.currentTime.value;
  this.framesNumber = this.spriteUniforms.framesNumber;
  this.frameTime = this.spriteUniforms.frameTime;       
  

  
  this.mesh = new THREE.Mesh( this.geometry, this.shaderMaterial );
  
}

AnimatedSprite.prototype.removeSprite = function(n){
  this.currentTime.splice(n,4);
  this.faces.splice(n,4);
  this.vertices.splice(n,4);
  this.colors.splice(n,4);
  this.texCoords.splice(n,4);
  
  //this.mesh = new THREE.Mesh( this.geometry, this.shaderMaterial );
}

AnimatedSprite.prototype.setSpriteAnimationParam = function(animationTime, framesNumber){
  this.animationTime = animationTime;
  this.framesNumber.value = framesNumber;
  this.frameTime.value = Math.floor(animationTime / framesNumber);
}

AnimatedSprite.prototype.updateTime = function(deltaTime){
      
  if(this.framesNumber.value > 1 && !isNaN(deltaTime)){
    for(var i = 0; i < this.currentTime.length ; i += 4 ){
      this.currentTime[i] = (deltaTime + this.currentTime[i]) % this.animationTime ;
      this.currentTime[i + 1] = this.currentTime[i] ;
      this.currentTime[i + 2] = this.currentTime[i] ;
      this.currentTime[i + 3] = this.currentTime[i] ;
    }
    
    this.spriteAttributes.currentTime.needsUpdate = true;
  }

}

AnimatedSprite.prototype.addSprite = function(pos, width, height){

  pos = pos || (new THREE.Vector3( 0.0,0.0,0.0  ));
  width = width || 1.0;
  height = height || 1.0;

  verticesLen = this.vertices.length ;

  this.vertices.push( (new THREE.Vector3( -10.0 * width,0.0,10.0 * height )).add(pos) );
  this.vertices.push( (new THREE.Vector3( 10.0 * width,0.0,10.0 * height )).add(pos) );
  this.vertices.push( (new THREE.Vector3( 10.0 * width,0.0,-10.0 * height )).add(pos) );
  this.vertices.push( (new THREE.Vector3( -10.0 * width,0.0,-10.0 * height )).add(pos) );
  
  var normal = new THREE.Vector3( 0, 1, 0 );
  var color = new THREE.Color( 0xffffff );
  var face = new THREE.Face4( verticesLen, verticesLen + 1,verticesLen + 2,verticesLen + 3, normal, color, 0 );
  
  this.geometry.faces.push(face);

  
  this.colors.push( new THREE.Vector3( 1.0,1.0,1.0 ));
  this.colors.push( new THREE.Vector3( 1.0,1.0,1.0 ));
  this.colors.push( new THREE.Vector3( 1.0,1.0,1.0 ));
  this.colors.push( new THREE.Vector3( 1.0,1.0,1.0 ));
  
  this.texCoords.push( new THREE.Vector2( 0.0,0.0 ));
  this.texCoords.push( new THREE.Vector2( 1.0,0.0 ));
  this.texCoords.push( new THREE.Vector2( 1.0,1.0 ));
  this.texCoords.push( new THREE.Vector2( 0.0,1.0 ));
  
  this.currentTime.push(0.0);
  this.currentTime.push(0.0);
  this.currentTime.push(0.0);
  this.currentTime.push(0.0);
  
  //this.mesh = new THREE.Mesh( this.geometry, this.shaderMaterial );

}

AnimatedSprite.prototype.rotate = function(n, angle){

  var axis = new THREE.Vector3( 0.0,0.0,0.0 );
  
  n *= 4;         
    
  for(var i = 0; i < 4; i++){
    axis.add(this.vertices[n + i]);
  }
  axis.divideScalar(4.0);
  
  for(var i = 0; i < 4; i++){
    this.vertices[n + i].sub(axis); 
    //this.vertices[n + i].x = this.vertices[n + i].x * Math.cos(angle) - this.vertices[n + i].z * Math.sin(angle);
    //this.vertices[n + i].z = this.vertices[n + i].x * Math.sin(angle) + this.vertices[n + i].z * Math.cos(angle);
     
    this.vertices[n + i].applyAxisAngle(new THREE.Vector3( 0.0,1.0,0.0 ) ,angle);
    
    this.vertices[n + i].add(axis);
  }
  
  this.mesh.geometry.verticesNeedUpdate = true;

}

AnimatedSprite.prototype.setRotation = function(n, angle, width, height){

  var axis = new THREE.Vector3( 0.0,0.0,0.0 );        
  
  n *= 4;   
  
  for(var i = 0; i < 4; i++){
    axis.add(this.vertices[n + i]);
  }
  axis.divideScalar(4.0);
  
  this.vertices[n] = (new THREE.Vector3( -10.0 * width,0.0,10.0 * height )) ;
  this.vertices[n + 1] = (new THREE.Vector3( 10.0 * width,0.0,10.0 * height ));
  this.vertices[n + 2] = (new THREE.Vector3( 10.0 * width,0.0,-10.0 * height ));
  this.vertices[n + 3] = (new THREE.Vector3( -10.0 * width,0.0,-10.0 * height ));
  
  for(var i = 0; i < 4; i++){
    this.vertices[n + i].applyAxisAngle(new THREE.Vector3( 0.0,1.0,0.0 ) ,angle);
    this.vertices[n + i].add(axis);
  }
  
  this.mesh.geometry.verticesNeedUpdate = true;
  
}

AnimatedSprite.prototype.addSpritePosition = function(n,x,z){
  x = x || 0.0;
  z = z || 0.0;
  
  n *= 4;
  
  for(var i = 0; i < 4; i++){
    this.vertices[n + i].add(new THREE.Vector3( x, 0.0, z)) ;
  }
  
}

AnimatedSprite.prototype.setSpritePosition = function(n,x,z){

  var axis = new THREE.Vector3( 0.0,0.0,0.0 );        
  
  n *= 4;   
  
  for(var i = 0; i < 4; i++){
    axis.add(this.vertices[n + i]);
  }
  axis.divideScalar(4.0);
  
  for(var i = 0; i < 4; i++){
    this.vertices[n + i].sub(axis);
    this.vertices[n + i].add(new THREE.Vector3( x, 0.0, z));
  }
  
  this.mesh.geometry.verticesNeedUpdate = true;
}