import {AddGameObjectSpeed, ConstructGameObject} from "./GameObjectBase";

export const Spaceship = (rendererSize) => {
    const size = 150
    const self = {}

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

    return self
}
