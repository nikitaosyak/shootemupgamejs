import {OBJECT_TYPE} from "./Constants";
import {Bullet} from "./gameObjects/Bullet";
export const BulletManager = () => {

    const COOLDOWN = 350
    let lastShotTime = Date.now()
    let playerShooting = false
    const bullets = []

    return {
        get pending() { return playerShooting && Date.now() - lastShotTime > COOLDOWN },
        iterate: action => bullets.forEach(action),

        playerStartShooting: () => {
            playerShooting = true
        },
        playerStopShooting: () => {
            playerShooting = false
        },
        spawn: (atX, atY) => {
            const b = Bullet(atX, atY, -270)
            lastShotTime = Date.now()
            return b

        },
        addIfPossible: (object) => {
            if (object.type !== OBJECT_TYPE.BULLET) return
            bullets.push(object)
        },
        removeIfPossible: (object) => {
            if (object.type !== OBJECT_TYPE.BULLET) return
            bullets.splice(bullets.indexOf(object), 1)
        }
    }
}