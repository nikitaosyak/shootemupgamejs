
export const Util = {
    getRandomInt: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    approximately:  (a, b) => { return Math.abs(a - b) < 0.001 },
    testAABB: (ax1, ax2, ay1, ay2, bx1, bx2, by1, by2) => {
        const isOverlapping = (a, b, c, d) => {
            if (b < c) return false // disjoint
            if (Util.approximately(b, c)) return false // single point

            const overlap = b - c
            return overlap > 10
        }

        const overlapX = ax1 < bx1 ? isOverlapping(ax1, ax2, bx1, bx2) : isOverlapping(bx1, bx2, ax1, ax2)
        const overlapY = ay1 < by1 ? isOverlapping(ay1, ay2, by1, by2) : isOverlapping(by1, by2, ay1, ay2)

        return overlapX && overlapY
    }
}