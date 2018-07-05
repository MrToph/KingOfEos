function makeKingdomKingIndex(kingdomOrder, kingOrder) {
    return kingdomOrder << 8 | kingOrder
}

function unmakeKingdomKingIndex(kingdomIndex) {
    return [kingdomIndex >> 8, kingdomIndex & 0xFF]
}

function getErrorDetail(error) {
    try {
        const json = typeof error === 'string' ? JSON.parse(error) : JSON.parse(error.message)
        return json.error.details[0].message
    } catch (err) {
        return error.message
    }
}

module.exports = {
    makeKingdomKingIndex,
    unmakeKingdomKingIndex,
    getErrorDetail,
}