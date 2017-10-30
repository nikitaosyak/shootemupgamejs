
export const ConstructGameObject =
    (texture, size, x, y, tint = 0xFFFFFF) => {
    const sprite = new PIXI.Sprite(window.resources.getTexture(texture))
    sprite.width = sprite.height = size
    sprite.anchor.x = sprite.anchor.y = 0.5
    sprite.x = x; sprite.y = y
    sprite.tint = tint

    return {
        get visual() { return sprite }
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