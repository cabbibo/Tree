function SpinControls( object , domElement ){

  this.object = object;
  this.domElement = ( domElement !== undefined ) ? domElement : document;


  this.center = new THREE.Vector3();
  this.y = 500;
  this.r = 2000;
  this.theta = 0;
  this.spinVelocity = 1;
  this.dampning = .99;


}

SpinControls.prototype.update = function(){


  this.theta += this.spinVelocity;
  this.spinVelocity *= this.dampening;

  this.object.position.y = this.y;

  var x = r * Math.sin( this.theta );
  var z = r * Math.cos( this.theta );


  this.object.position.x = x;
  this.object.position.z = z;

  this.object.lookAt( this.center );

  this.domElement.addEventListener( 'mousedown', mousedown, false );
  this.domElement.addEventListener( 'mousemove', mousemove, false );
  this.domElement.addEventListener( 'mouseup'  , mouseup, false );

  this.domElement.addEventListener( 'mousewheel', mousewheel, false );
  this.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); // firefox

  this.domElement.addEventListener( 'touchstart', touchstart, false );
  this.domElement.addEventListener( 'touchend', touchend, false );
  this.domElement.addEventListener( 'touchmove', touchmove, false );

  function touchmove( event ) {

    if ( _this.enabled === false ) return;

    event.preventDefault();
    event.stopPropagation();

    switch ( event.touches.length ) {

      case 1:
        _this.getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, _rotateEnd );
        break;

      case 2:
        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
        _touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy )
        break;

    }

  }


}
