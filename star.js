//let scene, camera, renderer, 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 40;
camera.position.y = 30;
scene.fog = new THREE.Fog(0xffffff, 20, 280);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-20, 35, 20);
scene.add(dirLight);

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

const d = 50;

dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;

dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = -0.0001;

const material = new THREE.MeshPhysicalMaterial({
  color: 0xdcdee0,
  roughness: 0.2,
  metalness: 0.9,
});

const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.8, 6, 4);
const cylinder = new THREE.Mesh(cylinderGeometry, material);
cylinder.rotation.z = Math.PI / 3;
cylinder.translateY(3);
cylinder.castShadow = true;

const cylinderGeometry2 = new THREE.CylinderGeometry(0.8, 0.2, 6, 4);
const cylinder2 = new THREE.Mesh(cylinderGeometry2, material);
cylinder2.rotation.z = (2 * Math.PI) / 3;
cylinder2.translateY(-3);
cylinder2.castShadow = true;

const cylinderGeometry3 = new THREE.CylinderGeometry(0.8, 0.2, 6, 4);
const cylinder3 = new THREE.Mesh(cylinderGeometry3, material);
cylinder3.castShadow = true;
cylinder3.translateY(-3);

const geometry = new THREE.TorusGeometry(6, 0.4, 16, 100);
const torus = new THREE.Mesh(geometry, material);
torus.castShadow = true;

let mercedesStar = new THREE.Group();
mercedesStar.add(cylinder);
mercedesStar.add(cylinder2);
mercedesStar.add(cylinder3);
mercedesStar.add(torus);
mercedesStar.position.set(0, 30, 0);
mercedesStar.castShadow = true;
mercedesStar.rotation.z = Math.PI;

scene.add(mercedesStar);

const geoPlane = new THREE.PlaneBufferGeometry(800, 800, 100, 100);
const mat3 = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
});
const plane = new THREE.Mesh(geoPlane, mat3);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -10;
plane.receiveShadow = true;
scene.add(plane);

function animate() {
  requestAnimationFrame(animate);

  mercedesStar.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();