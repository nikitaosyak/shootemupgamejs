import {Renderer} from "./Renderer";
import {Resources} from "./util/Resources";
import {Input} from "./Input";
import {LevelSpawner} from "./LevelSpawner";
import {Simulation} from "./Simulation";

window.onload = () => {
    const resources = window.resources = Resources()

    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)

    PIXI.settings.MIPMAP_TEXTURES = false

    const startGame = () => {
        const renderer = Renderer(canvas)
        const spawner = LevelSpawner()
        const input = new Input()
        const simulation = Simulation(renderer, spawner, input)

        let time = Date.now()
        const gameLoop = () => {
            const now = Date.now()
            const dt = now - time
            time = now
            simulation.update(dt / 1000)

            renderer.update()

            requestAnimationFrame(gameLoop)
        }
        gameLoop()
    }

    resources
        .add('spaceship', 'assets/spaceship_mockup.png')
        .add('asteroid', 'assets/asteroid_mockup.png')
        .add('star', 'assets/star.png')
        .add('star2', 'assets/star2.png')
        .add('pixel', 'assets/pixel.png')
        .add('bluebeam', 'assets/bluebeam.png')
        .add('health', 'assets/health.png')
        .load(() => {
            startGame()
        })
}