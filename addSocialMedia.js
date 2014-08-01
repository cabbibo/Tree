    var SOCIAL_MEDIA = [
        ["TWITTER" ,"twitter_1.png" , "http://twitter.com/share?text=%20Tree%20by%20@cabbibo%20(%20Made%20with%20%23threejs)%20:%20&url=http://cabbi.bo/Tree"],
        ["FACEBOOK", "facebook_1.png" , 'http://www.facebook.com/sharer.php?u=http://cabbi.bo/Tree'],
        ["SOUNDCLOUD" ,"soundcloud_1.png" , "https://soundcloud.com/cabbibo/tongue-wrong-song"],
        ["CABBIBO" , "cabbibo_1.png" , "http://cabbi.bo"],
      ]
      

  function addSocialMedia( smArray ){

      this.social = document.createElement('div');
      this.social.id = 'social';
      document.body.appendChild( this.social );

      window.titleEP  = document.createElement('a');
      window.titleEP.href = 'https://soundcloud.com/cabbibo';
      window.titleEP.target = '_blank';
      window.titleEP.id = 'titleEP';
      window.titleEP.innerHTML = 'TREE';


      this.social.appendChild( window.titleEP  );

      for( var i  = 0; i < smArray.length; i ++ ){

        var a = document.createElement('a');

        if( i != smArray.length -1 ){
          a.href = smArray[i][2];
          //if( i != 0 )
          a.target = '_blank';
        }else{
          a.onClick = "function(){ console.log('hello')}";
          a.id = "information"
        }



        a.style.background = 'url( img/icons/'+smArray[i][1]+')';
        a.style.backgroundSize = '100%';
        a.style.backgroundSize ="25px";
        a.style.backgroundPosition="center";
        a.style.backgroundRepeat="no-repeat";
        a.classList.add( 'social' );
        a.INFO_TEXT = smArray[i][0];

        this.social.appendChild( a );

      }


      $('.social').hover( function( e ){
        if( e.type == 'mouseenter' ){
          titleEP.innerHTML = e.toElement.INFO_TEXT;
        }else{
          titleEP.innerHTML = 'TREE';
        }
      });
}
