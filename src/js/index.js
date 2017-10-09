import {Renderer} from "./Renderer";
import {Resources} from "./util/Resources";
import {Input} from "./Input";

window.onload = () => {

    const resources = window.resources = Resources()

    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)

    const renderer = Renderer(canvas)

    const startGame = () => {

        const input = new Input()

        const spaceship = new PIXI.Sprite(resources.getTexture('spaceship'))
        renderer.addObject(spaceship)

        input.on('accelerate', (direction) => {
            spaceship.x += direction * 10
        })

        const gameLoop = () => {
            renderer.update()
            requestAnimationFrame(gameLoop)
        }
        gameLoop()
    }

    resources
        .add('spaceship', 'assets/spaceship_mockup.png')
        .load(() => {
            startGame()
        })
}