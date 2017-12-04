import {
    AddGameObjectSpeed, AddGameObjectType,
    AddVisual, GOBase
} from "./GameObjectBase";
import {OBJECT_TYPE} from "../Constants";
export const Bullet = (x, y, speed) => {

    const self = {
        update: (dt, pMult, destroyQueue, player, bulletMan, renderer) => {
            GOBase.moveConstant(self.visual, self.speed, dt, pMult)
            GOBase.eraseFromBottom(self, renderer.size, destroyQueue)
            GOBase.eraseFromTop(self, destroyQueue)
        }
    }

    Object.assign(
        self,
        AddVisual('bluebeam', 30, x, y, 0xFFFFFF, 0.5, speed > 0 ? 1: 0)
    )

    Object.assign(
        self,
        AddGameObjectSpeed(speed)
    )

    Object.assign(
        self,
        AddGameObjectType(OBJECT_TYPE.BULLET)
    )

    return self
}