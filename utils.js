function makeKingdomKingIndex(kingdomOrder, kingOrder) {
    return kingdomOrder << 8 | kingOrder
}

function unmakeKingdomKingIndex(kingdomIndex) {
    return [kingdomIndex >> 8, kingdomIndex & 0xFF]
}

module.exports = {
    makeKingdomKingIndex,
    unmakeKingdomKingIndex,
}