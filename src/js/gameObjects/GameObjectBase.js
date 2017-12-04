
import {PARALLAX_SPEED} from "../Constants";
import {Util} from "../util/Util";

export const AddVisual =
    (texture, size, x, y, tint = 0xFFFFFF, anchorX = 0.5, anchorY = 0.5) => {
    const sprite = new PIXI.Sprite(window.resources.getTexture(texture))
    sprite.width = sprite.height = size
    sprite.anchor.x = anchorX
    sprite.anchor.y = anchorY
    sprite.x = x; sprite.y = y
    sprite.tint = tint

    return {
        get visual() { return sprite }
    }
}

export const AddHealthBar = (parent) => {
    const sprite = new PIXI.Sprite(window.resources.getTexture('pixel'))

    sprite.width = parent.width/parent.scale.x * 0.9;
    sprite.height = 10/parent.scale.y

    sprite.x = -(parent.width/parent.scale.x)/2 + (parent.width/parent.scale.x)*0.05;
    sprite.y = (parent.height/parent.scale.y)/2

    sprite.anchor.x = 0; sprite.anchor.y = 1
    sprite.tint = 0xCC0000
    sprite.alpha = 0.7

    parent.addChild(sprite)

    const maxWidth = sprite.width

    return {
        setHealthBarValue(v) {
            sprite.width = maxWidth * v
        }
    }
}

export const AddGameObjectType = (type) => {
    return {
        get type() { return type }
    }
}

export const AddGameObjectSpeed = (speed) => {
    return {
        get speed() { return speed }
    }
}

export const GOBase = {
    moveConstant: (sprite, speed, dt, pMult) => {
        sprite.y += speed * dt - (pMult * PARALLAX_SPEED * dt)
    },
    eraseFromBottom: (self, rendererSize, destroyQueue) => {
        if (self.visual.y < rendererSize.y + self.visual.height/2) return
        destroyQueue.push(self)
    },
    eraseFromTop: (self, destroyQueue) => {
        if (self.visual.y > -self.visual.height) return
        destroyQueue.push(self)
    },
    isHit: (sprite1, sprite2) => {
        return Util.AABBvAABB(
            sprite1.x - sprite1.width/2, sprite1.x + sprite1.width/2,
            sprite1.y - sprite1.height/2, sprite1.y + sprite1.height/2,
            sprite2.x - sprite2.width/2, sprite2.x + sprite2.width/2,
            sprite2.y - sprite2.height/2, sprite2.y + sprite2.height/2
        )
    },
    checkBulletHit: (sprite, bulletMan, destroyQueue, onBulletHit) => {
        bulletMan.iterate(bullet => {
            const hit = Util.pointVAABB(bullet.visual.x, bullet.visual.y,
                sprite.x - sprite.width/2, sprite.x + sprite.width/2,
                sprite.y - sprite.height/2, sprite.y + sprite.height/2)
            if (hit) {
                destroyQueue.push(bullet)
                onBulletHit()
            }
        })
    }
}