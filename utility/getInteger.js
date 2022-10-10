export function getInteger(text) {

    let integer
    try {
        integer = parseInt(text, 10)
    } catch(err) {
        return null
    }
    return integer

}