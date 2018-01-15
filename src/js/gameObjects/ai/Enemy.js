import {
    AddGameObjectType, AddHealthBar, AddVisual,
    GOBase
} from "../GameObjectBase";
import {Util} from "../../util/Util";
import {OBJECT_TYPE} from "../../Constants";
import {
    MoveChase, MoveLinear, MoveZigZag,
    ShootConstantly, ShootOnSight, ShootPeriodically
} from "./EnemyBehaviours";

export const Enemy = () => {

    const enemySize = Util.getRandomInt(0, 1)
    const maxHealth = [4, 2][enemySize]
    const speed = [60, 100][enemySize]
    const damageOnHullHit = [2, 1][enemySize]
    const texture = ['enemy1', 'enemy2'][enemySize]
    const bulletSpeed = [300, 250][enemySize]

    const moveBehaviour = [MoveLinear, MoveZigZag, MoveChase][Util.getRandomInt(0, 2)](speed)
    const shootingBehaviour = [ShootConstantly, ShootPeriodically, ShootOnSight][Util.getRandomInt(0, 2)](enemySize, bulletSpeed)

    let health = maxHealth

    const self = {
        get currentHealth() { return health },
        subtractHealth() {
            health -= 1
            self.setHealthBarValue(health/maxHealth)
        },
        update: (dt, pMult, destroyQueue, player, bulletMan, renderer) => {

            shootingBehaviour.update(self, bulletMan, player)
            moveBehaviour.update(self, dt, pMult, renderer, player)

            GOBase.eraseFromBottom(self, renderer.size, destroyQueue)

            if (GOBase.isHit(player.visual, self.visual)) {
                destroyQueue.push(self)
                player.subtractHealth(damageOnHullHit)
            }

            if (player.warhead) {
                if (GOBase.isHit(player.warhead.visual, self.visual)) {
                    destroyQueue.push(self)
                    destroyQueue.push(player.warhead)
                    player.warhead = null
                }
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