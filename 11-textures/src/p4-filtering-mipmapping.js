import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

// Textures
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {console.log('onStart')}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')

// move pivot point to centre for rotation 
// colorTexture.rotation = Math.PI / 4
// colorTexture.center.x = 0.5 
// colorTexture.center.y = 0.5

// minFilter 
// colorTexture.minFilter = THREE.NearestFilter // dont need this when using magFilter
colorTexture.magFilter = THREE.NearestFilter // sharpens texture, better framerate 

// Scene 
const scene = new THREE.Scene()

// Create object 
const geometry = new THREE.BoxGeometry(1, 1, 1)
// const geometry = new THREE.TorusBufferGeometry(1, 0.35, 32, 100)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
console.log(geometry.attributes.uv)
const cube = new THREE.Mesh( geometry, material )
cube.position.set(0, 0, 0)
scene.add(cube)

// Scale 
cube.scale.set(1, 1, 1)   

// Camera 
const sizes = { 
  width: window.innerWidth, 
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
scene.add(camera)

// Cursor
const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) => 
{
  cursor.x = - (event.clientX / sizes.width - 0.5)
  cursor.y = event.clientY / sizes.width - 0.5
})

// Renderer 
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

// Animations 
const tick = () => {

  // Orbit Controls 
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.update()

  // Update Camera 
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  camera.position.y = cursor.y * 5
  camera.lookAt(cube.position)
  
  // Render 
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
  // function gets called on each frame 
}

tick()