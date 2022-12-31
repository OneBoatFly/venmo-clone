export const arrToObj = (arr) => {
    const obj = {}

    for (let item of arr) {
        obj[item.id] = item
    }

    return obj
}