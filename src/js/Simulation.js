import {RENDERER_LAYER} from "./Renderer";
export const Simulation = (renderer, spawner, input) => {

    const backgroundObjects = []

    return {
        update: () => {
            spawner.update()
            if (spawner.canSpawn) {
                const newObject = spawner.spawn()
                backgroundObjects.push(newObject)
                renderer.addObject(newObject, RENDERER_LAYER.BACKGROUND)
            }

            const toDestroy = []
            backgroundObjects.forEach(object => {
                object.y += 4
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