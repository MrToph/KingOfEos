import * as THREE from 'three'
import { siteBackgroundColor } from '../theme'
import addTerrain from './terrain'
import createCastle from './castle'

let clock
let camera, scene, renderer, objects

export function initCanvas(canvas) {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000)
    // camera.position.set(2, 4, 5)
    clock = new THREE.Clock()
    scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(siteBackgroundColor, 0.04)
    scene.background = new THREE.Color(siteBackgroundColor)

    createCastle(`https://picsum.photos/300/200`)
        .then(({ castle, flag }) => {
            scene.add(castle)
            scene.add(flag)
        })
        .catch(console.log)

    // lights
    const ambientLight = new THREE.AmbientLight(0xcccccc)
    // scene.add(ambientLight)

    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(10, 10, 10)
    light.castShadow = true // default false

    // Set up shadow properties for the light
    light.shadow.mapSize.width = 512 // default
    light.shadow.mapSize.height = 512 // default
    light.shadow.camera.near = 0.5 // default
    light.shadow.camera.far = 500 // default
    scene.add(light)

    // Directional lineHeight:
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(50, 500, 22)
    directionalLight.target.position.set(300, 400, 200)

    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 5000
    directionalLight.shadow.camera.left = -500
    directionalLight.shadow.camera.bottom = -500
    directionalLight.shadow.camera.right = 500
    directionalLight.shadow.camera.top = 500

    directionalLight.castShadow = true
    // scene.add(directionalLight)

    const planeGeometry = new THREE.PlaneBufferGeometry(100, 100, 2 ** 10, 2 ** 10)
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.lookAt(new THREE.Vector3(0, 1, 0))
    plane.receiveShadow = true
    // scene.add(plane)

    addTerrain(scene)

    // renderer
    renderer = new THREE.WebGLRenderer({ canvas })

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    // events
    window.addEventListener(`resize`, onWindowResize, false)
    animate()
}
//
function onWindowResize(event) {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}
//
function animate() {
    requestAnimationFrame(animate)
    render()
}
function render() {
    const timer = Date.now() * 0.0005
    camera.position.x = Math.cos(timer) * 18
    camera.position.y = 10
    camera.position.z = Math.sin(timer) * 18
    const lookAt = new THREE.Vector3(0, 5, 0).add(scene.position)
    camera.lookAt(lookAt)
    renderer.render(scene, camera)
}
