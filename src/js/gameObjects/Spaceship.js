import {
    AddGameObjectSpeed, AddGameObjectType,
    ConstructGameObject
} from "./GameObjectBase";
import {RENDERER_LAYER} from "../Renderer";

export const Spaceship = (rendererSize) => {
    const size = 150
    let health = 3
    const self = {
        get currentHealth() { return health },
        subtractHealth() {
            health -= 1
            console.log('current health: ', health)
        }
    }

    Object.assign(
        self,
        ConstructGameObject(
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

    return self
}
