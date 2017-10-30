import {AddGameObjectSpeed, ConstructGameObject} from "./GameObjectBase";
import {SPAWN_TYPE} from "../LevelSpawner";
import {Util} from "../util/Util";

export const DebrisObject = () => {

    const asteroidType = Util.getRandomInt(0, 2)
    const speed = [100, 150, 200][asteroidType]
    const tint = [0xCCCC00, 0xFFFFFF, 0xCC0000][asteroidType]

    const self = {}

    Object.assign(
        self,
        ConstructGameObject(
            SPAWN_TYPE.DEBRIS,
            'asteroid', 128, Util.getRandomInt(64, 736), tint
        )
    )

    Object.assign(
        self,
        AddGameObjectSpeed(speed)
    )

    return self
}