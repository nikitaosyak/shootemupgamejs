import {
    AddGameObjectSpeed, AddGameObjectType,
    AddVisual
} from "./GameObjectBase";
import {Util} from "../util/Util";
import {OBJECT_TYPE} from "../Constants";

export const DebrisObject = () => {

    const size = 128
    const debrisType = Util.getRandomInt(0, 2)
    const speed = [120, 170, 220][debrisType]
    const tint = [0xCCCC00, 0xFFFFFF, 0xCC0000][debrisType]
    const scale = [1.0, 0.8, 0.6][debrisType]

    const self = {}

    Object.assign(
        self,
        AddVisual(
            'asteroid', size * scale, Util.getRandomInt(64, 736), 0, tint
        )
    )

    Object.assign(
        self,
        AddGameObjectSpeed(speed)
    )

    Object.assign(
        self,
        AddGameObjectType(OBJECT_TYPE.DEBRIS)
    )

    return self
}