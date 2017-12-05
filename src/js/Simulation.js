import {OBJECT_TYPE} from "./Constants";
import {Spaceship} from "./gameObjects/Spaceship";
import {BulletManager} from "./BulletManager";
export const Simulation = (renderer, spawner, input) => {

    let spaceship = null
    const objects = []
    const bulletMan = BulletManager()

    const addToSimulation = (object) => {
        objects.push(object)
        renderer.addObject(object.visual, object.type)
        bulletMan.addIfPossible(object)
    }

    const destroyObject = (object) => {
        const objIndex = objects.indexOf(object)
        if (objIndex > -1) {
            objects.splice(objIndex, 1)
        }
        renderer.removeObject(object.visual, object.type)
        object.visual.destroy()
        bulletMan.removeIfPossible(object)
    }

    const spawnShip = () => {
        spaceship = Spaceship(renderer.size)
        renderer.addObject(spaceship.visual, OBJECT_TYPE.PLAYER)
    }
    spawnShip()

    let parallaxMultiplier = 0
    let currentAcceleration = {x: 0, y: 0}

    input.on('accelerate', (accelerationVector) => {

        if ('x' in accelerationVector) {
            currentAcceleration.x = accelerationVector.x
        }

        if ('y' in accelerationVector) {
            currentAcceleration.y = accelerationVector.y
            parallaxMultiplier = accelerationVector.y
        }
    })

    input.on('shoot', toggle => {
        if (toggle) {
            bulletMan.playerStartShooting(spaceship.visual)
        } else {
            bulletMan.playerStopShooting()
        }
    })

    return {
        update: (dt) => {
            const toDestroy = []
            spaceship.update(dt, currentAcceleration, renderer.size, toDestroy, bulletMan)

            spawner.update()
            if (spawner.canSpawn) {
                addToSimulation(spawner.spawn())
            }

            bulletMan.update(spaceship.visual)
            while (bulletMan.pending) {
                addToSimulation(bulletMan.spawnNext())
            }

            objects.forEach(object => object.update(
                dt, parallaxMultiplier, toDestroy, spaceship, bulletMan, renderer
            ))

            toDestroy.forEach(destroyObject)

            if (spaceship.currentHealth <= 0) {
                destroyObject(spaceship)
                spawnShip()
            }
        }
    }
}