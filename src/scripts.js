import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';




// mise en place du rendu webgl plus scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(125,
    window.innerWidth / window.innerHeight, 1, 1500);
camera.position.set(1, 1, 50);

/**-------------systeme background du syteme solaire */

//mise en place des dimensions du bg
const bgGeometry = new THREE.SphereGeometry(120, 100, 100);
//ajout de la texture des 2 cotes
const espaceTexture = new THREE.TextureLoader().load('./assets/etoile.jpeg');
const bgMaterial = new THREE.MeshStandardMaterial({
    map: espaceTexture, side: THREE.DoubleSide,
});
const bg = new THREE.Mesh(bgGeometry, bgMaterial);
scene.add(bg);
/*mise en place du texte */
// const loader = new THREE.FontLoader();
// loader.load('./fonts/code.json',function (){
//     const geometryFont = new THREE.TextGeometry('systeme solaire',{
            
//             size:6,
//             height:2,
//     })
//     const textMesh = new THREE.Mesh(geometryFont,[
//         new THREE.MeshPhongMaterial({color:0xad4000}),
//         new THREE.MeshPhongMaterial({color:0x5c2301})
//     ])
//     textMesh.catShadow = true;
//     textMesh.position.y +=15
//     textMesh.position.z +=40
//     textMesh.position.x = -8
    
//     scene.add(textMesh);

// });
/* texte simple*/
const p = document.createElement('p');
p.textContent = 'systeme solaire';
const cPointLabel = p;

scene.add(cPointLabel)

/**----------------------------------soleil   ---------------------------------- */
// mise en place de la lumiere
const spotLight = new THREE.SpotLight();
spotLight.position.set(1, 1, 100);
scene.add(spotLight);

const soleilTexture = new THREE.TextureLoader().load('./assets/soleil.jpg');
const soleilGeometry = new THREE.SphereGeometry(4);
const soleilMaterial = new THREE.MeshLambertMaterial({ map: soleilTexture });
const soleil = new THREE.Mesh(soleilGeometry,soleilMaterial);

soleil.rotation.x = 0.5;
soleil.rotation.y = 0.10;
soleil.position.x = 1;
scene.add(soleil);

/*--------------------------Planete jupiter --------------------------------*/
const jupiterGeometry = new THREE.SphereGeometry(4);
const uvJupiter = new THREE.TextureLoader().load('./assets/jupiter.jpg')
const jupiterMaterial = new THREE.MeshLambertMaterial({ map: uvJupiter });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);

jupiter.rotation.x = 0.5;
jupiter.rotation.y = 0.05;
jupiter.position.x = 0.50
jupiter.position.y = 0.050
jupiter.position.z = 20

scene.add(jupiter);

jupiter.geometry.translate(15, 10, 10);

/**-------------------------------------planete terre------------------------------------- */
const terreGeometry = new THREE.SphereGeometry(2);



/**texture  terre*********------------------- */
const uvTexture = new THREE.TextureLoader().load('./assets/earth.jpg')
const terrematerial = new THREE.MeshLambertMaterial({
    map: uvTexture,
});
const terre = new THREE.Mesh(terreGeometry, terrematerial);

terre.rotation.x = 0.5;
terre.position.y = 0.05;
terre.position.x = 12
terre.geometry.translate(28, 0, 1);



scene.add(terre);

/*-****************------lune -------------*/
const geometryLune = new THREE.SphereGeometry(0.5);


/**texture lune *********------------------- */
const LuneTexture = new THREE.TextureLoader().load('./assets/lune.jpg')
const materLune = new THREE.MeshLambertMaterial({
    map: LuneTexture,
});
const lune = new THREE.Mesh(geometryLune, materLune);
//scene.add(lune);



//lune.rotation.x = 0.005;
//lune.position.y = 0.005;
//lune.position.x =8
lune.geometry.translate(29, 0.8, 2.5);


//scene.add(lune);
terre.add(lune)

/**-------------------------------------------------------------------------- */
console.log(soleil.geometry);

/** gestion taille d'ecran  */
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
})
/**gestion des controles objet  zoom et dezoom manipulation */
 const controls = new OrbitControls(camera, renderer.domElement);

controls.update();
/**-----------------------------------------------methode ------------------------ */

/**fonction d'animation  */
function animate() {

    jupiter.rotation.y += 0.01
    soleil.rotation.y += 0.01
    terre.rotateY(0.004)
    lune.rotateY(0.00025)
    lune.rotateZ(0.00025)
    lune.rotateX(0.035)






    requestAnimationFrame(animate);
     controls.update();
    renderer.render(scene, camera);
}

animate();



