require.config({
    baseUrl: './',
    // ...
    packages: [
        {
          name: 'physicsjs',
          location: 'PhysicsJS/dist/physicsjs-full-0.5.4.min.js',
          main: 'physicsjs-0.5.4.min'
        }
    ],
    //...
});
require([
    'physicsjs',
    'physicsjs/bodies/circle' // will mix into the PhysicsJS library
], function( Physics ){
    
    // do something fun with circles!
});