import {someFunction} from './test'

window.onload = () => {

    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)

    const stage = new PIXI.Container();

    const renderer = PIXI.autoDetectRenderer({
        roundPixels: true,
        backgroundColor: 0x817066,
        width: 300,
        height: 300,
        view: canvas
    })

    const graphics = new PIXI.Graphics()
    stage.addChild(graphics)
    graphics.beginFill(0xcc0000)
    graphics.drawCircle(100, 100, 50)
    graphics.endFill()

    const gameLoop = () => {
        renderer.render(stage)

        requestAnimationFrame(gameLoop)
    }
    gameLoop()
}