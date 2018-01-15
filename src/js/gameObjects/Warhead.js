import {
    AddGameObjectSpeed, AddGameObjectType, AddVisual,
    GOBase
} from "./GameObjectBase";
import {OBJECT_TYPE} from "../Constants";

export const Warhead = (x, y) => {

    const self = {
        update: (dt, pMult, destroyQueue, player, bulletMan, renderer) => {
            GOBase.moveConstant(self.visual, self.speed, dt, pMult)
            if (GOBase.eraseFromTop(self, destroyQueue)) {
                player.warhead = null
            }
        }
    }

    Object.assign(self, AddVisual('rocket', 32, x, y))

    Object.assign(self, AddGameObjectSpeed(-350))

    Object.assign(self, AddGameObjectType(OBJECT_TYPE.WARHEAD))

    return self
}