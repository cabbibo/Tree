#extension GL_OES_standard_derivatives : enable

uniform float timer;
uniform sampler2D t_normal;
uniform sampler2D t_iri;

uniform vec3 lightPositions[5];
uniform sampler2D lightTextures[5];
uniform vec3 cameraPos;

uniform float lightCutoff;
uniform float lightPower;


varying vec3 vNorm;
varying vec3 vPos;
varying vec3 vMPos;
varying vec2 vUv;

varying vec3 vView;

const float timeMatMultiplier = .1;

void main(){

  vec3 fNorm = vNorm;
 
  vec3 camDir   = normalize( vMPos - cameraPos);


  vec3 totalIri = vec3( 0.);
  for( int i = 0; i < 5; i++ ){

    vec3 lightPos = lightPositions[i];

    vec3 lightRay = vMPos - lightPos;

    vec3 lightDir = normalize( lightRay );
    float lightDist = length( lightRay ); 
     
    float facingRatio = max( 0. ,  dot( -lightDir , fNorm ));

    vec3 refl = reflect( -lightDir , fNorm );
    float reflFR = dot( -refl , camDir );

    vec3 iri = texture2D( lightTextures[i] , vec2( reflFR*reflFR , 0. ) ).xyz;

    float distMultiplier = clamp( lightCutoff / lightDist , 0. , 1. );
    distMultiplier = pow( distMultiplier , lightPower );

    totalIri += iri * distMultiplier * facingRatio * facingRatio  * facingRatio;


  }


    
  gl_FragColor = vec4( totalIri , 1. );


}
