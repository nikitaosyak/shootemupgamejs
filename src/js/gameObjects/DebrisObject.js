import {
    AddGameObjectSpeed, AddGameObjectType,
    AddVisual, GOBase
} from "./GameObjectBase";
import {Util} from "../util/Util";
import {OBJECT_TYPE} from "../Constants";

export const DebrisObject = () => {

    const size = 128
    const debrisType = Util.getRandomInt(0, 2)
    const speed = [120, 170, 220][debrisType]
    const tint = [0xCCCC00, 0xFFFFFF, 0xCC0000][debrisType]
    const scale = [1.0, 0.8, 0.6][debrisType]

    const self = {
        update: (dt, pMult, destroyQueue, player, bulletMan, renderer) => {
            GOBase.moveConstant(self.visual, self.speed, dt, pMult)
            GOBase.eraseFromBottom(self, renderer.size, destroyQueue)

            if (GOBase.isHit(player.visual, self.visual)) {
                destroyQueue.push(self)
                player.subtractHealth()
            }

            if (player.warhead) {
                if (GOBase.isHit(player.warhead.visual, self.visual)) {
                    destroyQueue.push(self)
                    destroyQueue.push(player.warhead)
                    player.warhead = null
                }
            }

            GOBase.checkBulletHit(self.visual, bulletMan,
                destroyQueue, () => destroyQueue.push(self))
        }
    }

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