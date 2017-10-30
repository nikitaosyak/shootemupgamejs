import {
    AddGameObjectSpeed, AddGameObjectType, AddHealthBar,
    AddVisual
} from "./GameObjectBase";
import {RENDERER_LAYER} from "../Renderer";

export const Spaceship = (rendererSize) => {
    const size = 150
    const maxHealth = 5
    let health = maxHealth
    const self = {
        get currentHealth() { return health },
        subtractHealth() {
            health -= 1
            self.setHealthBarValue(health/maxHealth)
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
        AddGameObjectType(RENDERER_LAYER.PLAYER)
    )

    Object.assign(
        self,
        AddHealthBar(self.visual)
    )

    return self
}
