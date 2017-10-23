import {RENDERER_LAYER} from "./Renderer";
import {SPAWN_TYPE} from "./LevelSpawner";
export const Simulation = (renderer, spawner, input) => {

    const SPACESHIP_SPEED = 200
    const BACKGROUND_OBJECT_SPEED = 100
    const PARALLAX_SPEED = 25

    const objects = []
    const spawnTypeMapping = {}
    spawnTypeMapping[SPAWN_TYPE.BACKGROUND] = {renderLayer: RENDERER_LAYER.BACKGROUND}
    spawnTypeMapping[SPAWN_TYPE.DEBRIS] = {renderLayer: RENDERER_LAYER.DEBRIS}
    spawnTypeMapping[SPAWN_TYPE.AI] = {renderLayer: RENDERER_LAYER.BACKGROUND}

    const spaceship = new PIXI.Sprite(resources.getTexture('spaceship'))
    spaceship.width = spaceship.height = 256
    spaceship.anchor.x = spaceship.anchor.y = 0.5
    spaceship.x = renderer.size.x/2
    spaceship.y = renderer.size.y - spaceship.height/2
    renderer.addObject(spaceship, RENDERER_LAYER.PLAYER)

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

    return {
        update: (dt) => {

            spaceship.x += currentAcceleration.x * SPACESHIP_SPEED * dt
            spaceship.y += currentAcceleration.y * SPACESHIP_SPEED * dt

            if (spaceship.y < renderer.size.y/2) {
                spaceship.y = renderer.size.y/2
            }
            if (spaceship.y > renderer.size.y - spaceship.height/2) {
                spaceship.y = renderer.size.y - spaceship.height/2
            }

            if (spaceship.x < 0) {
                spaceship.x = renderer.size.x
            }
            if (spaceship.x > renderer.size.x) {
                spaceship.x = 0
            }

            spawner.update()
            if (spawner.canSpawn) {
                const newObject = spawner.spawn()
                objects.push({obj: newObject, type: spawner.spawnType})
                renderer.addObject(newObject, spawnTypeMapping[spawner.spawnType].renderLayer)
            }

            const toDestroy = []
            objects.forEach(container => {

                //
                // moving debris and background objects
                container.obj.y += BACKGROUND_OBJECT_SPEED * dt - (parallaxMultiplier * PARALLAX_SPEED * dt)
                if (container.obj.y > renderer.size.y + container.obj.height/2) {
                    toDestroy.push(container)
                }

                //
                // test debris for collision with spaceship
                if (container.type === SPAWN_TYPE.DEBRIS) {

                }
            })

            toDestroy.forEach(container => {
                objects.splice(objects.indexOf(container), 1)
                renderer.removeObject(container.obj, RENDERER_LAYER.BACKGROUND)
                container.obj.destroy()
            })
        }
    }
}