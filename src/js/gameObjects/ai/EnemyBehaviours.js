import {GOBase} from "../GameObjectBase";

export const MoveLinear = (speed) => {
    return {
        update(self, dt, pMult, _) {
            GOBase.moveConstant(self.visual, speed, dt, pMult)
        }
    }
}

export const MoveZigZag = (speed) => {
    let direction = 1
    return {
        update(self, dt, pMult, renderer, _) {
            if (self.visual.x < 0) direction = 1
            if (self.visual.x > renderer.size.x) direction = -1

            self.visual.x += speed * dt * direction
            GOBase.moveConstant(self.visual, speed, dt, pMult)
        }
    }
}

export const MoveChase = (speed) => {
    let direction = 1
    const boundaries = 20
    return {
        update(self, dt, pMult, renderer, player) {
            if (self.visual.x < player.visual.x) direction = 1
            if (self.visual.x > player.visual.x) direction = -1
            if (Math.abs(self.visual.x - player.visual.x) < boundaries) direction = 0

            self.visual.x += speed * dt * direction
            GOBase.moveConstant(self.visual, speed, dt, pMult)
        }
    }
}


export const ShootConstantly = (enemySize, bulletSpeed) => {
    const fireRate = [2000, 1000][enemySize]
    let lastShot = Date.now()
    return {
        update(self, bulletMan, _) {
            const now = Date.now()
            if (now - lastShot > fireRate) {
                bulletMan.addPending(
                    self.visual.x, self.visual.y + self.visual.height/2 + 20,
                    bulletSpeed, 'redbeam'
                )
                lastShot = now
            }
        }
    }
}

export const ShootPeriodically = (enemySize, bulletSpeed) => {
    const burstCount = [4, 3][enemySize]
    const shortCooldown = [400, 300][enemySize]
    const largeCooldown = [3000, 2000][enemySize]
    let lastShot = Date.now()
    let cooldownActive = false
    let currentBullet = 0

    return {
        update(self, bulletMan, _) {
            const now = Date.now()
            if (cooldownActive) {
                if (now - lastShot > largeCooldown) cooldownActive = false
            } else {
                if (now - lastShot > shortCooldown) {
                    bulletMan.addPending(
                        self.visual.x, self.visual.y + self.visual.height/2 + 20,
                        bulletSpeed, 'redbeam'
                    )
                    lastShot = now
                    currentBullet++

                    if (currentBullet >= burstCount) {
                        cooldownActive = true
                        currentBullet = 0
                    }
                }
            }
        }
    }
}

export const ShootOnSight = (enemySize, bulletSpeed) => {
    const fireRate = [1500, 800][enemySize]
    const boundaries = 50
    let lastShot = Date.now()

    return {
        update(self, bulletMan, player) {
            let canShoot = Math.abs(self.visual.x - player.visual.x) < boundaries
            if (!canShoot) return

            const now = Date.now()
            if (now - lastShot > fireRate) {
                bulletMan.addPending(
                    self.visual.x, self.visual.y + self.visual.height/2 + 20,
                    bulletSpeed, 'redbeam'
                )
                lastShot = now
            }
        }
    }
}