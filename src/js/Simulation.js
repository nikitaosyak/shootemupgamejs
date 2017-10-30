import {RENDERER_LAYER} from "./Renderer";
import {SPAWN_TYPE} from "./LevelSpawner";
import {Util} from "./util/Util";
import {Spaceship} from "./gameObjects/Spaceship";
export const Simulation = (renderer, spawner, input) => {

    const PARALLAX_SPEED = 40

    const objects = []
    const spawnTypeToRenderLayer = {}
    spawnTypeToRenderLayer[SPAWN_TYPE.BACKGROUND] = RENDERER_LAYER.BACKGROUND
    spawnTypeToRenderLayer[SPAWN_TYPE.DEBRIS] = RENDERER_LAYER.DEBRIS
    spawnTypeToRenderLayer[SPAWN_TYPE.AI] = RENDERER_LAYER.BACKGROUND

    const spaceship = Spaceship(renderer.size)
    renderer.addObject(spaceship.visual, RENDERER_LAYER.PLAYER)

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
            const pSprite = spaceship.visual
            pSprite.x += currentAcceleration.x * spaceship.speed * dt
            pSprite.y += currentAcceleration.y * spaceship.speed * dt

            if (pSprite.y < renderer.size.y/2) {
                pSprite.y = renderer.size.y/2
            }
            if (pSprite.y > renderer.size.y - pSprite.height/2) {
                pSprite.y = renderer.size.y - pSprite.height/2
            }

            if (pSprite.x < 0) {
                pSprite.x = renderer.size.x
            }
            if (pSprite.x > renderer.size.x) {
                pSprite.x = 0
            }

            spawner.update()
            if (spawner.canSpawn) {
                const newObject = spawner.spawn()
                objects.push(newObject)
                renderer.addObject(newObject.visual, spawnTypeToRenderLayer[newObject.type])
            }

            const toDestroy = []
            objects.forEach(object => {

                const sprite = object.visual
                //
                // moving debris and background objects
                sprite.y += object.speed * dt - (parallaxMultiplier * PARALLAX_SPEED * dt)
                if (sprite.y > renderer.size.y + sprite.height/2) {
                    toDestroy.push(object)
                }

                //
                // test debris for collision with spaceship
                if (object.type === SPAWN_TYPE.DEBRIS) {
                    const hit = Util.testAABB(
                        pSprite.x - pSprite.width/2, pSprite.x + pSprite.width/2,
                        pSprite.y - pSprite.height/2, pSprite.y + pSprite.height/2,
                        sprite.x - sprite.width/2, sprite.x + sprite.width/2,
                        sprite.y - sprite.height/2, sprite.y + sprite.height/2
                    )
                    if (hit) {
                        // console.log('hit detected')
                    }
                }
            })

            toDestroy.forEach(object => {
                objects.splice(objects.indexOf(object), 1)
                renderer.removeObject(object.visual, spawnTypeToRenderLayer[object.type])
                object.visual.destroy()
            })
        }
    }
}