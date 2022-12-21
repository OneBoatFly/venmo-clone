export const getDecimalNum = (int) => {
    const amount = int / 100
    return amount.toFixed(2)
}