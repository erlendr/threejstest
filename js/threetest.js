var camera, scene, renderer;
var geometry, material, mesh;
var meshes;

var gridWidth = 50;
var gridHeight = 50;

init();
animate();

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}


function init() {
	//Set up "static" vars
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 75;
	var NEAR = 0.1;
	var FAR = 10000;

	//Create camera
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, WIDTH / HEIGHT, NEAR, FAR);

	//Pull camera back
	camera.position.x = gridWidth*5;
	camera.position.y = 0;
	camera.position.z = 500;

	camera.rotation.x = 0.5;
	
	//Create scene
	scene = new THREE.Scene();

	meshes = createArray(gridWidth, gridHeight);

	for(var i = 0; i < gridHeight; i++) {
		for(var j = 0; j < gridWidth; j++) {
			if(Math.round(Math.random(1)) == 1) {
				meshes[i][j] = addCube(10, 10, 10, (j*10), (i*10), 0);
			}
		}
	}

	// create a point light
	var pointLight = new THREE.PointLight(0xffffff);

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// add to the scene
	scene.add(pointLight);

	//Create renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(WIDTH, HEIGHT);

	//Add dom element to body
	document.body.appendChild(renderer.domElement);
}

function addCube(x, y, z, posx, posy, posz) {
	//Add a mesh
	geometry = new THREE.CubeGeometry(x, y, z);
	material = new THREE.MeshPhongMaterial({color: 0xff0000});
	mesh = new THREE.Mesh(geometry, material);
	
	mesh.position.x = posx;
	mesh.position.y = posy;
	mesh.position.z = posz;

	scene.add(mesh);
	return mesh;
}

function animate() {
	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame(animate);

	for(var i = 0; i < gridHeight; i++) {
		for(var j = 0; j < gridWidth; j++) {
			if(typeof meshes[i][j] !== "undefined") {
				meshes[i][j].rotation.x += 0.01; 
				meshes[i][j].rotation.y += 0.02; 
			}
		}
	}

	renderer.render(scene, camera);
}