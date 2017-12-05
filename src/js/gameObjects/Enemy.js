import {
    AddGameObjectType, AddHealthBar, AddVisual,
    GOBase
} from "./GameObjectBase";
import {Util} from "../util/Util";
import {OBJECT_TYPE} from "../Constants";

export const Enemy = () => {

    const enemyType = Util.getRandomInt(0, 1)
    const fireRate = [2000, 1000][enemyType]
    const maxHealth = [4, 2][enemyType]
    const speed = [60, 100][enemyType]
    const damageOnHullHit = [2, 1][enemyType]
    const texture = ['enemy1', 'enemy2'][enemyType]

    let health = maxHealth
    let lastShot = Date.now()

    const self = {
        get currentHealth() { return health },
        subtractHealth() {
            health -= 1
            self.setHealthBarValue(health/maxHealth)
        },
        update: (dt, pMult, destroyQueue, player, bulletMan, renderer) => {
            const now = Date.now()
            if (now - lastShot > fireRate) {
                // console.log('addding enemy bullet')
                bulletMan.addPending(self.visual.x, self.visual.y + self.visual.height/2 + 20, 270, 'redbeam')
                lastShot = now
            }

            GOBase.moveConstant(self.visual, speed, dt, pMult)
            GOBase.eraseFromBottom(self, renderer.size, destroyQueue)

            if (GOBase.isHit(player.visual, self.visual)) {
                destroyQueue.push(self)
                player.subtractHealth(damageOnHullHit)
            }

            GOBase.checkBulletHit(self.visual, bulletMan, destroyQueue, () => {
                self.subtractHealth()
                if (health <= 0) {
                    destroyQueue.push(self)
                }
            })
        }
    }

    Object.assign(self, AddVisual(texture, 125, Util.getRandomInt(0, 800), 0))
    Object.assign(self, AddHealthBar(self.visual))
    Object.assign(self, AddGameObjectType(OBJECT_TYPE.AI))

    return self
}