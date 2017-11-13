
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