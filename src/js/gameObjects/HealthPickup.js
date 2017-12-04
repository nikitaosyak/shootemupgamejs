import {
    AddGameObjectSpeed, AddGameObjectType,
    AddVisual, GOBase
} from "./GameObjectBase";
import {Util} from "../util/Util";
import {OBJECT_TYPE} from "../Constants";

export const HealthPickup = () => {

    const self = {
        update: (dt, pMult, destroyQueue, player, bulletMan, renderer) => {
            GOBase.moveConstant(self.visual, self.speed, dt, pMult)
            GOBase.eraseFromBottom(self, renderer.size, destroyQueue)

            if (GOBase.isHit(player.visual, self.visual)) {
                player.fillHealth()
                destroyQueue.push(self)
            }
        }
    }

    Object.assign(self,
        AddVisual('health', 64, Util.getRandomInt(32, 768), 0)
    )

    Object.assign(self, AddGameObjectSpeed(100))

    Object.assign(self, AddGameObjectType(OBJECT_TYPE.HEALTH_PICKUP))

    return self
}