import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'


// Debug
const gui = new dat.GUI()

const parameters = {
  color: 0xff0000
}

console.log('hello')

// Scene 
const scene = new THREE.Scene()

// Create object 
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const cube = new THREE.Mesh( geometry, material )
scene.add(cube)

// Debug 
gui
   .add(cube.position, 'y')
   .min(-3)
   .max(3)
   .step(0.01)
   .name('elevation') 
   // .name is an optional label 

gui
   .add(cube, 'visible')
   // creates a check box in close controls to make visible or invisible 

gui
   .add(material, 'wireframe')
   // create a wireframe version 

gui
  .addColor(parameters, 'color')
  .onChange(() => 
  {
    console.log('tweak did not change color')
    console.log(material.color.set(parameters.color))
  })

// Sizes
const sizes = { 
  width: window.innerWidth, 
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Renderer 
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

// Animations 
const tick = () => {

  // Orbit Controls 
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = false
  controls.update()
  
  // Render 
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
  // function gets called on each frame 
}

tick()