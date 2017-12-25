import {OBJECT_TYPE} from "./Constants";
import {Bullet} from "./gameObjects/Bullet";
export const BulletManager = () => {

    let player
    let lastShotTime = Date.now()
    let playerWantsToShoot = false
    const pending = []
    const bullets = []

    const self = {
        injectPlayer : (value) => { player = value },
        update: () => {
            const now = Date.now()
            if (playerWantsToShoot && now - lastShotTime > player.shootingCooldown) {
                pending.push({
                    x: player.visual.x,
                    y: player.visual.y - player.visual.height/2 - 20,
                    texture: 'bluebeam', speed: -270})
                lastShotTime = now
            }
        },
        get pending() { return pending.length },
        iterate: action => bullets.forEach(action),

        addPending: (x, y, speed, texture) => {
            pending.push({x: x, y: y, texture: texture, speed: speed})
        },
        playerStartShooting: () => {
            playerWantsToShoot = true
            self.update()
        },
        playerStopShooting: () => {
            playerWantsToShoot = false
        },
        spawnNext: () => {
            const bulletParams = pending.shift()
            return Bullet(bulletParams.x, bulletParams.y, bulletParams.texture, bulletParams.speed)
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
    return self
}