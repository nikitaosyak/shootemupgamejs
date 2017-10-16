import {Renderer} from "./Renderer";
import {Resources} from "./util/Resources";
import {Input} from "./Input";
import {LevelSpawner} from "./LevelSpawner";

window.onload = () => {

    const resources = window.resources = Resources()

    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)

    PIXI.settings.MIPMAP_TEXTURES = false

    const renderer = Renderer(canvas)
    const spawner = LevelSpawner()

    const startGame = () => {

        const input = new Input()

        const spaceship = new PIXI.Sprite(resources.getTexture('spaceship'))
        spaceship.width = spaceship.height = 128
        spaceship.anchor.x = spaceship.anchor.y = 0.5
        spaceship.x = renderer.size.x/2
        spaceship.y = renderer.size.y - spaceship.height/2
        renderer.addObject(spaceship)

        input.on('accelerate', (direction) => {
            spaceship.x += direction * 10
        })

        const gameLoop = () => {
            spawner.update()
            if (spawner.canSpawn) {
                //
                renderer.addObject(spawner.spawn())
            }

            renderer.update()
            requestAnimationFrame(gameLoop)
        }
        gameLoop()
    }

    resources
        .add('spaceship', 'assets/spaceship_mockup.png')
        .add('star', 'assets/star.png')
        .load(() => {
            startGame()
        })
}