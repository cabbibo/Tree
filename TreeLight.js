function TreeLight( page , params){

  var mat = new THREE.ShaderMaterial({

    uniforms:{
      
      timer:timer,
      normalScale:  page.lightParams.normalScale,
      texScale:     page.lightParams.texScale,

      t_normal: { type:"t"  , value: TEXTURES.moss },
      cameraPos:{ type:"v3" , value: camera.position },
      color:    { type:"v3" , value: params.color },
      t_audio:  { type:"t"  , value: params.loadedAudio.texture },
      hovered:  { type:"f"  , value: 0 }

    },

    vertexShader:shaders.vs.treeLight,
    fragmentShader:shaders.fs.treeLight

  });  



  var light = new THREE.Mesh( params.geo , mat );
  
  light.page  = page;

  light.playing = true;
  light.hovered = false;

   
  light.ID    = params.id;

  light.title = params.title;
  light.audio = params.loadedAudio;
  light.texture = params.loadedAudio.texture;
  light.color   = params.color;

  light.name = params.audio;

  light.radius = params.radius;
  light.height = params.height;
  light.theta  = params.theta;

  light.position.copy( params.position );

  page.lightParams.textures.value.push(   light.texture  );
  page.lightParams.positions.value.push(  light.position );
  page.lightParams.colors.value.push(     light.color );

    
  page.looper.everyLoop( function(){ this.audio.play() }.bind( light ) );

  light.audio.updateAnalyser = true;
  light.audio.updateTexture = true;

  

  light.hoverOver = function(){

    infoElement.innerHTML = this.title;
    
    this.hovered = true;
    this.material.uniforms.hovered.value = 1;

    for( var i = 0; i < this.page.lights.length; i++ ){

      if( this.page.lights[i] !== this ){

        this.page.lights[i].audio.filter.frequency.value = 300;

      }

    }


  }.bind( light );

  light.hoverOut = function(){

    this.hovered = false;

    infoElement.innerHTML = "";

    this.material.uniforms.hovered.value = 0;


    for( var i = 0; i < this.page.lights.length; i++ ){

      if( this.page.lights[i] !== this ){

        var f =  this.page.lights[i].audio.filter;
        f.frequency.value = f.frequency.maxValue;

      }

    }

  }.bind( light );

  light.select = function(){

    this.playing = !this.playing;

    if( this.playing === false ){

      this.audio.gain.gain.value = 0;

    }else{

    this.audio.gain.gain.value = .8;


    }

  }.bind( light );


  light.update = function(){


    if( !this.hovered && this.playing ){

      this.theta += .001 + this.ID * .001;
      
      this.position.x = this.radius * Math.cos( this.theta );
      this.position.z = this.radius * Math.sin( this.theta );
      this.position.y = this.height + Math.cos( (this.theta*(this.ID+5)/3 )) * 100;

      this.rotation.x += (this.ID + 5) / 1000;
      this.rotation.y -= ((this.ID%1)*10 + 5) / 1000;
      this.rotation.z -= (20 - this.ID) / 2000;

      G.tmpV3.copy( this.position );
      G.tmpV3.sub( camera.position );
      
      var length = G.tmpV3.length();

      var a = Math.min( 1000. / length , 1. );

      this.audio.gain.gain.value = a;

    }


  }.bind( light );


  objectControls.add( light );

  page.lights.push( light );

  page.scene.add( light );
  //return light;


}
