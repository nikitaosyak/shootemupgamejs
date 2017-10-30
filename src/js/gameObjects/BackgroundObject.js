import {AddGameObjectSpeed, ConstructGameObject} from "./GameObjectBase";
import {SPAWN_TYPE} from "../LevelSpawner";
import {Util} from "../util/Util";

export const BackgroundObject = () => {

    const parallaxLevel = Util.getRandomInt(0, 2)
    const speed = [45, 60, 85][parallaxLevel]
    const scale = [0.5, 0.7, 0.9][parallaxLevel]
    const texture = ['star', 'star2'][Util.getRandomInt(0, 1)]
    console.log(texture)

    const self = {}

    Object.assign(
        self,
        ConstructGameObject(
            SPAWN_TYPE.BACKGROUND,
            texture, 50 * scale, Util.getRandomInt(0, 800)
        )
    )

    Object.assign(
        self,
        AddGameObjectSpeed(speed)
    )

    return self
}