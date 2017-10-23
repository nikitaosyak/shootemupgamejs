import {RENDERER_LAYER} from "./Renderer";
export const Simulation = (renderer, spawner, input) => {

    const BACKGROUND_OBJECT_SPEED = 80
    const PARALLAX_SPEED = 25

    const backgroundObjects = []

    const spaceship = new PIXI.Sprite(resources.getTexture('spaceship'))
    spaceship.width = spaceship.height = 256
    spaceship.anchor.x = spaceship.anchor.y = 0.5
    spaceship.x = renderer.size.x/2
    spaceship.y = renderer.size.y - spaceship.height/2
    renderer.addObject(spaceship, RENDERER_LAYER.PLAYER)

    let parallaxMultiplier = 0

    input.on('accelerate', (direction) => {
        spaceship.x += direction.x * 10
        spaceship.y += direction.y * 10

        if (Math.abs(direction.y) > 0) {
            parallaxMultiplier = direction.y
        } else if (direction.x === 0 && direction.y === 0) {
            parallaxMultiplier = 0
        }
    })

    return {
        update: (dt) => {

            spawner.update()
            if (spawner.canSpawn) {
                const newObject = spawner.spawn()
                backgroundObjects.push(newObject)
                renderer.addObject(newObject, RENDERER_LAYER.BACKGROUND)
            }

            const toDestroy = []
            backgroundObjects.forEach(object => {
                object.y += BACKGROUND_OBJECT_SPEED * dt - (parallaxMultiplier * PARALLAX_SPEED * dt)
                if (object.y > renderer.size.y + object.height/2) {
                    toDestroy.push(object)
                }
            })

            toDestroy.forEach(object => {
                backgroundObjects.splice(backgroundObjects.indexOf(object), 1)
                renderer.removeObject(object, RENDERER_LAYER.BACKGROUND)
                object.destroy()
            })
        }
    }
}