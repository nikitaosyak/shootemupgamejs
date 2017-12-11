import {GOBase} from "../GameObjectBase";

export const MoveLinear = (speed) => {
    return {
        update(self, dt, pMult, _) {
            GOBase.moveConstant(self.visual, speed, dt, pMult)
        }
    }
}

export const MoveZigZag = (speed) => {
    let direction = 1
    return {
        update(self, dt, pMult, renderer, _) {
            if (self.visual.x < 0) direction = 1
            if (self.visual.x > renderer.size.x) direction = -1

            self.visual.x += speed * dt * direction
            GOBase.moveConstant(self.visual, speed, dt, pMult)
        }
    }
}

export const MoveChase = (speed) => {
    let direction = 1
    const boundaries = 20
    return {
        update(self, dt, pMult, renderer, player) {
            if (self.visual.x < player.visual.x) direction = 1
            if (self.visual.x > player.visual.x) direction = -1
            if (Math.abs(self.visual.x - player.visual.x) < boundaries) direction = 0

            self.visual.x += speed * dt * direction
            GOBase.moveConstant(self.visual, speed, dt, pMult)
        }
    }
}


export const ShootConstantly = () => {

}

export const ShootPeriodically = () => {

}

export const ShootOnSight = () => {

}