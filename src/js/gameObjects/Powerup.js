import {
    AddGameObjectSpeed, AddGameObjectType,
    AddVisual, GOBase
} from "./GameObjectBase";
import {Util} from "../util/Util";
import {OBJECT_TYPE} from "../Constants";

export const Powerup = () => {

    const idx = Util.getRandomInt(0, 3)
    const sprite = ['health', 'shield', 'speedRocket', 'shooting'][idx]
    const tint = [0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF][idx]
    const action = ['fillHealth', 'addHealth', 'addSpeed', 'addShootingSpeed'][idx]

    const self = {
        update: (dt, pMult, destroyQueue, player, bulletMan, renderer) => {
            GOBase.moveConstant(self.visual, self.speed, dt, pMult)
            GOBase.eraseFromBottom(self, renderer.size, destroyQueue)

            if (GOBase.isHit(player.visual, self.visual)) {
                player[action]()
                destroyQueue.push(self)
            }
        }
    }

    Object.assign(self,
        AddVisual(sprite, 64, Util.getRandomInt(32, 768), 0, tint)
    )

    Object.assign(self, AddGameObjectSpeed(100))

    Object.assign(self, AddGameObjectType(OBJECT_TYPE.POWERUP))

    return self
}