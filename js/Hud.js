function HudSprite(textureName){


  this.spriteAttributes  = {

      texCoord: { type: 'v2', value: [] }
    };
    
  this.spriteUniforms = {

      texture:   { type: "t", value: THREE.ImageUtils.loadTexture( textureName ) },
      hull:   { type: "f", value: 0.0 },
      energy:   { type: "f", value: 0.0 }
      
    };
  
  

  this.shaderMaterial = new THREE.ShaderMaterial( {

    uniforms:     this.spriteUniforms,
    attributes:     this.spriteAttributes ,
    vertexShader:   shaders["hud"].vertex,
    fragmentShader: shaders["hud"].fragment,

    //blending:     THREE.AdditiveBlending,
    dynamic:        true,
    depthTest:    false,
    transparent:  true

  });
  
  this.shaderMaterial.depthWrite = false;
  
  this.geometry = new THREE.Geometry();
  
  this.texCoords = this.spriteAttributes.texCoord.value;      
  this.vertices = this.geometry.vertices;
  this.faces = this.geometry.faces;
  
  this.vertices.push( (new THREE.Vector3( 0.0, 1.0, 0.0 )) );
  this.vertices.push( (new THREE.Vector3( 1.0, 1.0, 0.0 )) );
  this.vertices.push( (new THREE.Vector3( 0.0, 0.0, 0.0 )) );
  this.vertices.push( (new THREE.Vector3( 1.0, 0.0, 0.0 )) );
  
  var normal = new THREE.Vector3( 0, 1, 0 );
  var color = new THREE.Color( 0xffffff );
  var face = new THREE.Face4( 0, 2, 3, 1, normal, color, 0 );
  this.geometry.faces.push(face);
  
  this.texCoords.push( new THREE.Vector2( 0.0,1.0 ));
  this.texCoords.push( new THREE.Vector2( 1.0,1.0 ));
  this.texCoords.push( new THREE.Vector2( 0.0,0.0 ));
  this.texCoords.push( new THREE.Vector2( 1.0,0.0 ));
  
  
  this.mesh = new THREE.Mesh( this.geometry, this.shaderMaterial );
  this.mesh.position = new THREE.Vector3( -1, -1, 0 );
  
  this.width = 0.4;
  this.height = 0.4;
  
  this.mesh.scale.x = this.width;
  this.mesh.scale.y = this.height;
}