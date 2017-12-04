import {
    AddGameObjectSpeed, AddGameObjectType,
    AddVisual, GOBase
} from "./GameObjectBase";
import {Util} from "../util/Util";
import {OBJECT_TYPE} from "../Constants";

export const BackgroundObject = () => {

    const parallaxLevel = Util.getRandomInt(0, 2)
    const speed = [45, 60, 85][parallaxLevel]
    const scale = [0.5, 0.7, 0.9][parallaxLevel]
    const texture = ['star', 'star2'][Util.getRandomInt(0, 1)]

    const self = {
        update: (dt, pMult, destroyQueue, player, bulletMan, renderer) => {
            GOBase.moveConstant(self.visual, self.speed, dt, pMult)
            GOBase.eraseFromBottom(self, renderer.size, destroyQueue)
        }
    }

    Object.assign(
        self,
        AddVisual(
            texture, 50 * scale, Util.getRandomInt(0, 800), 0
        )
    )

    Object.assign(
        self,
        AddGameObjectSpeed(speed)
    )

    Object.assign(
        self,
        AddGameObjectType(OBJECT_TYPE.BACKGROUND)
    )

    return self
}