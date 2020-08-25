import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Scene, WebGLRenderer, PerspectiveCamera, HemisphereLight, GridHelper, AxesHelper } from 'three';

export function gltfImport(element) {
  let renderer, scene, camera, controls;
  init();
  animate();

  function init() {
    renderer =  new WebGLRenderer();
    renderer.setClearColor(0xB2B2B2);
    renderer.setSize( window.innerWidth, window.innerHeight );
    element.appendChild(renderer.domElement);

    camera = new PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set( 400, 200, 0 );

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.minDistance = 100;
    controls.maxDistance = 1000;
    controls.maxPolarAngle = Math.PI/2;

    scene = new Scene();
    scene.add( new HemisphereLight( 0xffffff, 0x000000, 5 ));
    
    // const gridGround = new GridHelper( 10, 10, 0x3f3f3f, 0x3f3f3f );
    // gridGround.rotation.x = Math.PI / 2;
    // scene.add( gridGround );
    // var axesHelper = new AxesHelper( 12 );
    // scene.add( axesHelper );

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('../node_modules/three/examples/js/libs/draco/gltf/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader( dracoLoader );
    loader.load(
      '../static/gltf/LittlestTokyo.glb',
      gltf => {
        const model = gltf.scene;
        model.position.set(0,0,0);
        scene.add(model);
      },
      xhr => console.log(`${xhr.loaded/xhr.total * 100}% loaded`), 
      err => console.log(err));
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
  }
  function render() {
    renderer.render(scene, camera);
  }
}