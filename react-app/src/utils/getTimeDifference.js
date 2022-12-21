export const getTimeDifference = (dateStr) => {
    const createdAtTime = new Date(dateStr)
    const nowTime = new Date()
    const diffTime = nowTime - createdAtTime

    const diffMinute = Math.ceil(diffTime / 60000)
    const diffHour = Math.ceil(diffTime / (3600000))
    const diffDay = Math.ceil(diffTime / 86400000)
    
    const shortDate = createdAtTime.toLocaleString('default', { month: 'short', day: "numeric" });

    if (createdAtTime > nowTime) {
        return shortDate
    }

    if (diffMinute < 60) {
        return diffMinute + 'm'
    } else if (diffHour < 24) {
        return diffHour + 'h'
    } else if (diffDay < 30) {
        return diffDay + 'd'
    } else {
        return shortDate
    }
}