import {emitterBehaviour} from "./util/EmitterBehaviour";
export const Input = (canvasElement) => {

    const eventDictionary = {}
    const self = {}
    Object.assign(self, emitterBehaviour(eventDictionary))

    window.onkeypress = (e) => {
        if (e.keyCode === 97) { // left
            self.emit('accelerate', -1)
        }
        if (e.keyCode === 100) { // right
            self.emit('accelerate', 1)
        }
        if (e.keyCode === 32) { // shoot
            self.emit('shoot')
        }
    }

    return self
}