import {
    AddGameObjectSpeed, AddGameObjectType, AddHealthBar,
    AddVisual
} from "./GameObjectBase";
import {OBJECT_TYPE} from "../Constants"

export const Spaceship = (rendererSize) => {
    const size = 150
    const maxHealth = 5
    let health = maxHealth
    const self = {
        get currentHealth() { return health },
        subtractHealth() {
            health -= 1
            self.setHealthBarValue(health/maxHealth)
        },
        fillHealth() {
            health = maxHealth
            self.setHealthBarValue(health/maxHealth)
        },
        update(dt, currentAcceleration, rendererSize) {
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
        AddGameObjectSpeed(200)
    )

    Object.assign(
        self,
        AddGameObjectType(OBJECT_TYPE.PLAYER)
    )

    Object.assign(
        self,
        AddHealthBar(self.visual)
    )

    return self
}
