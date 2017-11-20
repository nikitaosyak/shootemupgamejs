import {Util} from "./util/Util";
import {BackgroundObject} from "./gameObjects/BackgroundObject";
import {DebrisObject} from "./gameObjects/DebrisObject";
import {OBJECT_TYPE} from "./Constants";
import {HealthPickup} from "./gameObjects/HealthPickup";

export const LevelSpawner = () => {

    const rollFrequency = 500
    const typeFrequency = {}
    typeFrequency[OBJECT_TYPE.BACKGROUND] = 400
    typeFrequency[OBJECT_TYPE.DEBRIS] = 2000
    typeFrequency[OBJECT_TYPE.AI] = 5000
    typeFrequency[OBJECT_TYPE.HEALTH_PICKUP] = 40000

    const typeToConstructor = {}
    typeToConstructor[OBJECT_TYPE.BACKGROUND] = BackgroundObject
    typeToConstructor[OBJECT_TYPE.DEBRIS] = DebrisObject
    typeToConstructor[OBJECT_TYPE.AI] = BackgroundObject
    typeToConstructor[OBJECT_TYPE.HEALTH_PICKUP] = HealthPickup

    let lastSpawn = 0
    const lastTypedSpawn = {}
    lastTypedSpawn[OBJECT_TYPE.BACKGROUND] = 0
    lastTypedSpawn[OBJECT_TYPE.DEBRIS] = 0
    lastTypedSpawn[OBJECT_TYPE.AI] = 0
    lastTypedSpawn[OBJECT_TYPE.HEALTH_PICKUP] = Date.now()

    let canSpawn = false
    let nextSpawnType = OBJECT_TYPE.NONE

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