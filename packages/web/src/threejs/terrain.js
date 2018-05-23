// https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_terrain.html
/* eslint-disable */
import * as THREE from 'three'
import ImprovedNoise from './ImprovedNoise'

const textureQuality = 1024
const maxHeight = 10
export default function addTerrain(scene) {
    const data = generateHeight(textureQuality, textureQuality)
    const texture = new THREE.CanvasTexture(generateTexture(data, textureQuality, textureQuality))
    const material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 })
    let quality = 64,
        step = textureQuality / quality
    const geometry = new THREE.PlaneGeometry(64, 64, quality - 1, quality - 1)
    geometry.rotateX(-Math.PI / 2)
    for (let i = 0, l = geometry.vertices.length; i < l; i++) {
        let x = i % quality,
            y = Math.floor(i / quality)
        geometry.vertices[i].y = data[x * step + y * step * textureQuality] / 256 * maxHeight
    }
    const mesh = new THREE.Mesh(geometry, material)
    const scale = 0.5
    mesh.scale.set(scale, scale, scale)
    mesh.receiveShadow = false
    mesh.matrixAutoUpdate = false
    mesh.updateMatrix()
    scene.add(mesh)
}

function generateHeight(width, height) {
    let data = new Uint8Array(width * height),
        perlin = new ImprovedNoise(),
        size = width * height,
        quality = 2,
        z = Math.random()
    for (let j = 0; j < 4; j++) {
        quality *= 4
        for (let i = 0; i < size; i++) {
            let x = i % width,
                y = ~~(i / width)
            data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * 0.5) * quality + 10
        }
    }
    // console.log(data)
    // data values are between 0 and 256
    return data
}
function generateTexture(data, width, height) {
    let canvas, context, image, imageData, level, diff, vector3, sun, shade
    vector3 = new THREE.Vector3(0, 0, 0)
    sun = new THREE.Vector3(1, 1, 1)
    sun.normalize()
    canvas = document.createElement(`canvas`)
    canvas.width = width
    canvas.height = height
    context = canvas.getContext(`2d`)
    context.fillStyle = `#000`
    context.fillRect(0, 0, width, height)
    image = context.getImageData(0, 0, width, height)
    imageData = image.data
    for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
        vector3.x = data[j - 1] - data[j + 1]
        vector3.y = 2
        vector3.z = data[j - width] - data[j + width]
        vector3.normalize()
        shade = vector3.dot(sun)
        imageData[i] = (96 + shade * 128) * (data[j] * 0.007)
        imageData[i + 1] = (32 + shade * 96) * (data[j] * 0.007)
        imageData[i + 2] = shade * 96 * (data[j] * 0.007)
    }
    context.putImageData(image, 0, 0)
    return canvas
}
