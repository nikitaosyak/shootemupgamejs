
export const Resources = () => {
    const self = {
        add: (alias, path) => {
            PIXI.loader.add(alias, path)
            return self
        },
        load: (onComplete) => {
            PIXI.loader.load(onComplete)
            return self
        },
        getTexture: (alias) => {
            return PIXI.loader.resources[alias].texture
        }
    }

    return self
}