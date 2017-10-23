
export const RENDERER_LAYER = {BACKGROUND: 'background', PLAYER: 'player', DEBRIS: 'debris'}

export const Renderer = (canvasElement) => {

    const virtualSize = {x: 800, y: 1280}

    const stage = new PIXI.Container()
    const backgroundLayer = new PIXI.Container()
    const playerLayer = new PIXI.Container()
    const debris = new PIXI.Container()

    stage.addChild(backgroundLayer)
    stage.addChild(playerLayer)
    stage.addChild(debris)

    const layerMapping = {}
    layerMapping[RENDERER_LAYER.BACKGROUND] = backgroundLayer
    layerMapping[RENDERER_LAYER.PLAYER] = playerLayer
    layerMapping[RENDERER_LAYER.DEBRIS] = debris

    const pixiRenderer = PIXI.autoDetectRenderer({
        width: virtualSize.x,
        height: virtualSize.y,
        view: canvasElement,
        backgroundColor: 0x000000,
        autoResize: false
    })

    let currentCanvasSize = {x: 0, y: 0}
    const resizeCanvas = () => {
        currentCanvasSize.x = window.innerWidth
        currentCanvasSize.y = window.innerHeight

        const widthMultiplier = currentCanvasSize.y / virtualSize.y
        pixiRenderer.resize(Math.round(virtualSize.x * widthMultiplier), currentCanvasSize.y)

        const horizontalMargin = (currentCanvasSize.x - pixiRenderer.width) / 2
        canvasElement.style.marginLeft = Math.round(horizontalMargin).toString() + 'px'

        stage.scale.x = pixiRenderer.width / virtualSize.x
        stage.scale.y = pixiRenderer.height / virtualSize.y
    }

    return {
        get size() { return virtualSize },
        addObject: (displayObject, layer) => {
            layerMapping[layer].addChild(displayObject)
        },
        removeObject: (displayObject, layer) => {
            layerMapping[layer].removeChild(displayObject)
        },
        update: () => {
            pixiRenderer.render(stage)
            resizeCanvas()
        }
    }
}