import {Util} from "./util/Util";
import {BackgroundObject} from "./gameObjects/BackgroundObject";
import {DebrisObject} from "./gameObjects/DebrisObject";
export const SPAWN_TYPE = {BACKGROUND: 'background', DEBRIS: 'debris', AI: 'ai', NONE: 'none'}

export const LevelSpawner = () => {

    const resources = window.resources

    const rollFrequency = 500
    const typeFrequency = {}
    typeFrequency[SPAWN_TYPE.BACKGROUND] = 400
    typeFrequency[SPAWN_TYPE.DEBRIS] = 2000
    typeFrequency[SPAWN_TYPE.AI] = 5000

    const typeToConstructor = {}
    typeToConstructor[SPAWN_TYPE.BACKGROUND] = BackgroundObject
    typeToConstructor[SPAWN_TYPE.DEBRIS] = DebrisObject
    typeToConstructor[SPAWN_TYPE.AI] = BackgroundObject

    let lastSpawn = 0
    const lastTypedSpawn = {}
    lastTypedSpawn[SPAWN_TYPE.BACKGROUND] = 0
    lastTypedSpawn[SPAWN_TYPE.DEBRIS] = 0
    lastTypedSpawn[SPAWN_TYPE.AI] = 0

    let canSpawn = false
    let nextSpawnType = SPAWN_TYPE.NONE

    return {
        update() {
            const now = Date.now()

            // will we perform a spawn roll
            if (now - lastSpawn < rollFrequency) return

            // pick all the available types for roll
            const toRoll = []
            for (const spawnType in lastTypedSpawn) {
                if (now - lastTypedSpawn[spawnType] < typeFrequency[spawnType]) continue
                toRoll.push(spawnType)
            }

            if (toRoll.length === 0) return

            // console.log('Time to spawn! selecting from: ', toRoll)
            const toSpawn = toRoll[Util.getRandomInt(0, toRoll.length-1)]

            // console.log('Spawned type: ', toSpawn)
            lastSpawn = lastTypedSpawn[toSpawn] = now

            canSpawn = true
            nextSpawnType = toSpawn
        },
        get canSpawn() { return canSpawn },
        get spawnType() { return nextSpawnType },
        spawn() {
            const object = typeToConstructor[nextSpawnType]()
            canSpawn = false
            return object
        }
    }
}