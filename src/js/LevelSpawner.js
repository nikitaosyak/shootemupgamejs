import {Util} from "./util/Util";
export const SPAWN_TYPE = {BACKGROUND: 'background', DEBRIS: 'debris', AI: 'ai', NONE: 'none'}

export const LevelSpawner = () => {

    const resources = window.resources

    const rollFrequency = 1000
    const typeFrequency = {}
    typeFrequency[SPAWN_TYPE.BACKGROUND] = 900
    typeFrequency[SPAWN_TYPE.DEBRIS] = 1500
    typeFrequency[SPAWN_TYPE.AI] = 2000

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
            switch (nextSpawnType) {
                case SPAWN_TYPE.BACKGROUND:
                case SPAWN_TYPE.DEBRIS:
                case SPAWN_TYPE.AI:
                    const sprite = new PIXI.Sprite(resources.getTexture('star'))
                    sprite.width = sprite.height = 64
                    sprite.anchor.x = sprite.anchor.y = 0.5
                    sprite.x = Util.getRandomInt(0, 800)
                    canSpawn = false

                    return sprite
                    break
                case SPAWN_TYPE.NONE:
                    console.error('trying to spawn NONE')
            }
        }
    }
}