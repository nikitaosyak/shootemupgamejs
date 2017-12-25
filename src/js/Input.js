import {emitterBehaviour} from "./util/EmitterBehaviour";
export const Input = (canvasElement) => {

    const eventDictionary = {}
    const self = {
        pressed: {}
    }
    Object.assign(self, emitterBehaviour(eventDictionary))

    window.onkeydown = (e) => {
        self.pressed[e.key] = true
        if (e.key === 'a') { // left
            self.emit('accelerate', {x: -1})
        }
        if (e.key === 'd') { // right
            self.emit('accelerate', {x: 1})
        }
        if (e.key === 'w') { // toward
            self.emit('accelerate', {y: -1})
        }
        if (e.key === 's') { // backward
            self.emit('accelerate', {y: 1})
        }

        if (e.key === ' ') {
            self.emit('shoot', true)
        }
    }

    window.onkeyup = (e) => {
        self.pressed[e.key] = false
        if (e.key === 'a') { // left
            if (self.pressed['d']) {
                self.emit('accelerate', {x: 1})
            } else {
                self.emit('accelerate', {x: 0})
            }
        }
        if (e.key === 'd') { // right
            if (self.pressed['a']) {
                self.emit('accelerate', {x: -1})
            } else {
                self.emit('accelerate', {x: 0})
            }
        }
        if (e.key === 'w') { // toward
            if (self.pressed['s']) {
                self.emit('accelerate', {y: 1})
            } else {
                self.emit('accelerate', {y: 0})
            }
        }
        if (e.key === 's') { // backward
            if (self.pressed['w']) {
                self.emit('accelerate', {y: -1})
            } else {
                self.emit('accelerate', {y: 0})
            }
        }

        if (e.key === ' ') {
            self.emit('shoot', false)
        }

        if (e.key === 'r') {
            self.emit('shootWarhead')
        }
    }

    return self
}