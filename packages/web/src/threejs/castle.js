// https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_terrain.html
import * as THREE from 'three'

const defaultFlagImageUrl = `/static/kingofeos.gif`

const createCastleFactory = async scene => {
    const loader = new THREE.JSONLoader()
    const castleTexture = new THREE.TextureLoader().load(`/static/models/wall.jpg`)
    const castleMaterial = new THREE.MeshBasicMaterial({ map: castleTexture })
    const castleGeometry = await new Promise(resolve => {
        loader.load(`/static/models/castle.json`, geometry => {
            resolve(geometry)
        })
    })

    // already preload castle data
    return (index = 0) => {
        const castle = new THREE.Mesh(castleGeometry, castleMaterial)
        const x = 0
        const y = 0.0001
        const z = 0
        castle.position.set(x, y, z)
        const scale = 0.1
        castle.scale.set(scale, scale, scale)
        castle.matrixAutoUpdate = false
        castle.castShadow = false
        castle.receiveShadow = false
        castle.updateMatrix()

        const flagTexture = new THREE.TextureLoader().load(defaultFlagImageUrl)
        const flagMaterial = new THREE.MeshBasicMaterial({ map: flagTexture })
        const cubeGeometry = new THREE.BoxBufferGeometry(5, 2.2, 0.01)
        const flag = new THREE.Mesh(cubeGeometry, flagMaterial)
        flag.position.set(-0.5, 9.5, 1.1)
        castle.updateData = ({ imageUrl } = { imageUrl: defaultFlagImageUrl }) => {
            const oldImageUrl = flagMaterial.map.image.src
            if (imageUrl === oldImageUrl) return
            const newFlagTexture = new THREE.TextureLoader().load(imageUrl)
            flagMaterial.setValues({ map: newFlagTexture })
            flagMaterial.needsUpdate = true
        }
        scene.add(castle)
        scene.add(flag)
        return castle
    }
}

export default createCastleFactory
