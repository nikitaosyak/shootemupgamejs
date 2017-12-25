import {
    AddCooldownBar,
    AddGameObjectSpeed, AddGameObjectType, AddHealthBar,
    AddVisual, GOBase
} from "./GameObjectBase";
import {OBJECT_TYPE} from "../Constants"

export const Spaceship = (rendererSize) => {
    const size = 150

    let warheadCooldown = 0
    let shootingCooldown = 500
    let speed = 100
    let maxHealth = 5
    let health = maxHealth

    const self = {
        get speed() { return speed },
        get currentHealth() { return health },
        get shootingCooldown() { return shootingCooldown },
        get canFireWarhead() { return warheadCooldown >= 1 },
        resetWarheadCooldown() { warheadCooldown = 0 },
        subtractHealth(value = 1) {
            health -= value
            self.setHealthBarValue(health/maxHealth)
        },
        fillHealth() {
            health = maxHealth
            self.setHealthBarValue(health/maxHealth)
        },
        addHealth() {
            maxHealth += 1
            self.fillHealth()
        },
        addSpeed() {
            speed = Math.min(300, speed + 50)
        },
        addShootingSpeed() {
            shootingCooldown = Math.max(200, shootingCooldown - 30)
        },
        update(dt, currentAcceleration, rendererSize, destroyQueue, bulletMan) {
            warheadCooldown = Math.min(1, warheadCooldown + 0.002)
            self.setCooldownBarValue(warheadCooldown)

            self.visual.x += currentAcceleration.x * self.speed * dt
            self.visual.y += currentAcceleration.y * self.speed * dt

            if (self.visual.y < rendererSize.y/2) {
                self.visual.y = rendererSize.y/2
            }
            if (self.visual.y > rendererSize.y - self.visual.height/2) {
                self.visual.y = rendererSize.y - self.visual.height/2
            }

            if (self.visual.x < 0) {
                self.visual.x = rendererSize.x
            }
            if (self.visual.x > rendererSize.x) {
                self.visual.x = 0
            }

            GOBase.checkBulletHit(self.visual, bulletMan, destroyQueue, () => {
                self.subtractHealth()
            })
        }
    }

    Object.assign(
        self,
        AddVisual(
            'spaceship', size, rendererSize.x/2, rendererSize.y - size/2
        )
    )

    Object.assign(
        self,
        AddGameObjectType(OBJECT_TYPE.PLAYER)
    )

    Object.assign(self, AddHealthBar(self.visual))
    Object.assign(self, AddCooldownBar(self.visual))

    return self
}
