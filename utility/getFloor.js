export function getFloor(value, step) {
    step || (step = 1)
    let inv = 1 / step
    return Math.floor(value * inv) / inv
}