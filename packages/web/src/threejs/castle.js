// https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_terrain.html
import * as THREE from 'three'

const defaultFlagImageUrl = `/static/kingofeos.png`

const castleMeshScale = 0.1
const towerCastleRatio = 0.32
const flagPosition = new THREE.Vector3(-0.5, 9.5, 1.1).divideScalar(castleMeshScale)
const towerPosition = new THREE.Vector3(-2.1, 5, -1.2)
const fractalRotation = new THREE.Vector3(0, Math.PI * 2 / 3, 0)
const getCastleMetrics = index => {
    let scale = castleMeshScale
    const position = new THREE.Vector3(0, 0, 0)
    const rotation = new THREE.Vector3(0, 0, 0)

    for (let i = 0; i < index; i += 1) {
        scale *= towerCastleRatio
        const towerDirection = towerPosition.clone().multiplyScalar(towerCastleRatio ** i)
        // the initial castle is _not_ rotated by fractalRotation, so we need to skip it for the second castle
        if(i > 0) towerDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * 2 / 3)
        position.add(towerDirection)
        rotation.add(fractalRotation)
    }

    return {
        scale,
        position,
        rotation,
    }
}

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
        const { scale, position, rotation } = getCastleMetrics(index)
        castle.position.set(position.x, position.y, position.z)
        castle.rotation.set(rotation.x, rotation.y, rotation.z)
        castle.scale.set(scale, scale, scale)
        castle.matrixAutoUpdate = false
        castle.castShadow = false
        castle.receiveShadow = false
        castle.updateMatrix()

        const flagTexture = new THREE.TextureLoader().load(defaultFlagImageUrl)
        const flagMaterial = new THREE.MeshBasicMaterial({ map: flagTexture })
        const cubeGeometry = new THREE.BoxBufferGeometry(5, 2.2, 0.01)
        const flag = new THREE.Mesh(cubeGeometry, flagMaterial)
        flag.position.set(flagPosition.x, flagPosition.y, flagPosition.z)
        // flag needs scaling of 1, but is a child of castle, so divide it by castles scale
        flag.scale.set(1 / castleMeshScale, 1 / castleMeshScale, 1 / castleMeshScale)

        castle.updateData = ({ imageUrl } = { imageUrl: defaultFlagImageUrl }) => {
            const oldImageUrl = flagMaterial.map.image.src
            if (imageUrl === oldImageUrl) return
            const newFlagTexture = new THREE.TextureLoader().load(imageUrl)
            flagMaterial.setValues({ map: newFlagTexture })
            flagMaterial.needsUpdate = true
        }

        castle.add(flag)
        scene.add(castle)
        return castle
    }
}

export default createCastleFactory
