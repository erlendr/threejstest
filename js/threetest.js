var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
	//Set up "static" vars
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45;
	var NEAR = 0.1;
	var FAR = 10000;

	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, WIDTH / HEIGHT, NEAR, FAR);
	camera.position.z = 500;

	scene = new THREE.Scene();

	geometry = new THREE.CubeGeometry( 100, 100, 100 );
	material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );
}

function animate() {
	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame( animate );

	mesh.rotation.x += 0.001;
	mesh.rotation.y += 0.002;

	renderer.render( scene, camera );
}