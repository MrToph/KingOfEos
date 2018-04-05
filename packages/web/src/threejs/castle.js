// https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_terrain.html
import * as THREE from 'three'

export default function createCastle(flagImageUrl) {
    const loader = new THREE.JSONLoader()
    const texture = new THREE.TextureLoader().load(`/static/models/wall.jpg`)
    const material = new THREE.MeshBasicMaterial({ map: texture })
    return new Promise((resolve, reject) => {
        loader.load(`/static/models/Tower.json`, (geometry, materials) => {
            const castle = new THREE.Mesh(geometry, material)
            const x = 0
            const y = 0.0001
            const z = 0
            castle.position.set(x, y, z)
            const scale = 0.1
            castle.scale.set(scale, scale, scale)
            castle.matrixAutoUpdate = false
            castle.castShadow = true
            castle.receiveShadow = true
            castle.updateMatrix()

            const flagTexture = new THREE.TextureLoader().load(flagImageUrl)
            const flagMaterial = new THREE.MeshBasicMaterial({ map: flagTexture })
            const cubeGeometry = new THREE.BoxBufferGeometry(5, 2.2, 0.01)
            const flag = new THREE.Mesh(cubeGeometry, flagMaterial)
            flag.position.set(-0.5, 9.5, 1.1)
            flag.rotation.y = 0
            console.log(flag)
            resolve({ castle, flag })
        })
    })
}
