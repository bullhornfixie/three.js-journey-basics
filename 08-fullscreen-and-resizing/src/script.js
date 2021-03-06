import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Scene 
const scene = new THREE.Scene()

// Create object 
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, 0, 0)
scene.add( cube )

// Scale 
cube.scale.set(1, 1, 1)   

// Camera 
const sizes = { 
  width: window.innerWidth, // sets width to browser window
  height: window.innerHeight
}

window.addEventListener('resize', () => {

  // Update sizes
  sizes.width = window.innerWidth 
  sizes.height = window.innerHeight

  // Update camera 
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer 
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  // crisper finish by minimising pixel ratio to 1 for devices that have pixel ratio above 1
})

console.log('hello')

// window.addEventListener('dblclick', () => 
// {
//   if(!document.fullscreenElement) {
//     canvas.requestFullscreen()
//   }
//   else {
//     console.log('leave fullscreen')
//   }
// })

// to work on chrome 

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if(!fullscreenElement) {
    if(canvas.requestFullscreen){
      canvas.requestFullscreen()
    }
    else if(canvas.webkitRequestFullscreen){
      canvas.webkitRequestFullScreen()
    }
    else {
     if(document.exitFullscreen) {
       document.exitFullscreen()
     }
    }
   }
})

// to work on safari and firefox

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200) 
// (FOV, aspect ratio, near plane, far plane)

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

// Orbit Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()

// Animations 
const tick = () => {

  // Update Camera 
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  camera.position.y = cursor.y * 5
  camera.lookAt(cube.position)

  // Render 
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
