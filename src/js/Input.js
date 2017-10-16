import {emitterBehaviour} from "./util/EmitterBehaviour";
export const Input = (canvasElement) => {

    const eventDictionary = {}
    const self = {}
    Object.assign(self, emitterBehaviour(eventDictionary))

    window.onkeydown = (e) => {
        if (e.key === 'a') { // left
            self.emit('accelerate', {x: -1, y: 0})
        }
        if (e.key === 'd') { // right
            self.emit('accelerate', {x: 1, y: 0})
        }
        if (e.key === 'w') { // toward
            self.emit('accelerate', {y: -1, x: 0})
        }
        if (e.key === 's') { // backward
            self.emit('accelerate', {y: 1, x: 0})
        }
    }

    window.onkeyup = (e) => {
        if (e.key === 'w') { // toward
            self.emit('accelerate', {y: 0, x: 0})
        }
        if (e.key === 's') { // backward
            self.emit('accelerate', {y: 0, x: 0})
        }
    }

    return self
}