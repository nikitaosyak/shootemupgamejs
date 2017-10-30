
export const ConstructGameObject =
    (type, texture, size, xPosition, tint = 0xFFFFFFFF) => {
    const sprite = new PIXI.Sprite(window.resources.getTexture(texture))
    sprite.width = sprite.height = size
    sprite.anchor.x = sprite.anchor.x = 0.5
    sprite.tint = tint
    sprite.x = xPosition

    return {
        get type() { return type },
        get visual() { return sprite }
    }
}

export const AddGameObjectSpeed = (speed) => {
    return {
        get speed() { return speed }
    }
}