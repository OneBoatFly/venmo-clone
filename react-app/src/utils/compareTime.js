export const compareTime = (t1, t2) => {
    const t1Date = new Date(t1.createdAt)
    const t2Date = new Date(t2.createdAt)

    return t2Date - t1Date
}