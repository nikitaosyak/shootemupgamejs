import {Util} from "./util/Util";
import {OBJECT_TYPE} from "./Constants";
import {Spaceship} from "./gameObjects/Spaceship";
import {BulletManager} from "./BulletManager";
export const Simulation = (renderer, spawner, input) => {

    const PARALLAX_SPEED = 40

    let spaceship = null
    const objects = []
    const bulletMan = BulletManager()

    const addToSimulation = (object) => {
        objects.push(object)
        renderer.addObject(object.visual, object.type)
        bulletMan.addIfPossible(object)
    }

    const destroyObject = (object) => {
        const objIndex = objects.indexOf(object)
        if (objIndex > -1) {
            objects.splice(objIndex, 1)
        }
        renderer.removeObject(object.visual, object.type)
        object.visual.destroy()
        bulletMan.removeIfPossible(object)
    }

    const spawnShip = () => {
        spaceship = Spaceship(renderer.size)
        renderer.addObject(spaceship.visual, OBJECT_TYPE.PLAYER)
    }
    spawnShip()

    let parallaxMultiplier = 0
    let currentAcceleration = {x: 0, y: 0}

    input.on('accelerate', (accelerationVector) => {

        if ('x' in accelerationVector) {
            currentAcceleration.x = accelerationVector.x
        }

        if ('y' in accelerationVector) {
            currentAcceleration.y = accelerationVector.y
            parallaxMultiplier = accelerationVector.y
        }
    })

    input.on('shoot', toggle => {
        if (toggle) {
            const vis = spaceship.visual
            bulletMan.playerStartShooting()
            // addToSimulation(bulletMan.spawn())
        } else {
            bulletMan.playerStopShooting()
        }
    })

    return {
        update: (dt) => {
            const pSprite = spaceship.visual
            pSprite.x += currentAcceleration.x * spaceship.speed * dt
            pSprite.y += currentAcceleration.y * spaceship.speed * dt

            if (pSprite.y < renderer.size.y/2) {
                pSprite.y = renderer.size.y/2
            }
            if (pSprite.y > renderer.size.y - pSprite.height/2) {
                pSprite.y = renderer.size.y - pSprite.height/2
            }

            if (pSprite.x < 0) {
                pSprite.x = renderer.size.x
            }
            if (pSprite.x > renderer.size.x) {
                pSprite.x = 0
            }

            spawner.update()
            if (spawner.canSpawn) {
                addToSimulation(spawner.spawn())
            }

            if (bulletMan.pending) {
                addToSimulation(bulletMan.spawn(pSprite.x, pSprite.y - pSprite.height/2 - 20))
            }

            const toDestroy = []
            objects.forEach(object => {

                const sprite = object.visual
                //
                // moving debris and background objects
                sprite.y += object.speed * dt - (parallaxMultiplier * PARALLAX_SPEED * dt)

                if (object.type === OBJECT_TYPE.BULLET) {
                    if (sprite.y < -sprite.height) {
                        toDestroy.push(object)
                    }
                }
                if (sprite.y > renderer.size.y + sprite.height/2) {
                    toDestroy.push(object)
                }

                //
                // collision detection
                if (object.type === OBJECT_TYPE.DEBRIS) {
                    const hit = Util.AABBvAABB(
                        pSprite.x - pSprite.width/2, pSprite.x + pSprite.width/2,
                        pSprite.y - pSprite.height/2, pSprite.y + pSprite.height/2,
                        sprite.x - sprite.width/2, sprite.x + sprite.width/2,
                        sprite.y - sprite.height/2, sprite.y + sprite.height/2
                    )

                    bulletMan.iterate(bullet => {
                        const bulletHit = Util.pointVAABB(
                            bullet.visual.x, bullet.visual.y,
                            sprite.x - sprite.width/2, sprite.x + sprite.width/2,
                            sprite.y - sprite.height/2, sprite.y + sprite.height/2
                        )
                        if (bulletHit) {
                            toDestroy.push(object)
                            toDestroy.push(bullet)
                        }
                    })

                    if (hit) {
                        toDestroy.push(object)
                        spaceship.subtractHealth()
                    }
                }
            })

            toDestroy.forEach(destroyObject)

            if (spaceship.currentHealth === 0) {
                destroyObject(spaceship)
                spawnShip()
            }
        }
    }
}