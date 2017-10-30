import {
    AddGameObjectSpeed, AddGameObjectType,
    ConstructGameObject
} from "./GameObjectBase";
import {SPAWN_TYPE} from "../LevelSpawner";
import {Util} from "../util/Util";

export const BackgroundObject = () => {

    const parallaxLevel = Util.getRandomInt(0, 2)
    const speed = [45, 60, 85][parallaxLevel]
    const scale = [0.5, 0.7, 0.9][parallaxLevel]
    const texture = ['star', 'star2'][Util.getRandomInt(0, 1)]

    const self = {}

    Object.assign(
        self,
        ConstructGameObject(
            texture, 50 * scale, Util.getRandomInt(0, 800), 0
        )
    )

    Object.assign(
        self,
        AddGameObjectSpeed(speed)
    )

    Object.assign(
        self,
        AddGameObjectType(SPAWN_TYPE.BACKGROUND)
    )

    return self
}