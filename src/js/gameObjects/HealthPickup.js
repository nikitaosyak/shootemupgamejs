import {
    AddGameObjectSpeed, AddGameObjectType,
    AddVisual
} from "./GameObjectBase";
import {Util} from "../util/Util";
import {OBJECT_TYPE} from "../Constants";

export const HealthPickup = () => {

    const self = {}

    Object.assign(self,
        AddVisual('health', 64, Util.getRandomInt(32, 768), 0)
    )

    Object.assign(self, AddGameObjectSpeed(100))

    Object.assign(self, AddGameObjectType(OBJECT_TYPE.HEALTH_PICKUP))

    return self
}