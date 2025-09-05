export function trierD(array) {
    return array.sort((a,b) => new Date(b.date) - new Date(a.date))
}

export function trierC(array) {
    return array.sort((a,b) => new Date(a.date) - new Date(b.date))
}