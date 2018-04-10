export const initialState = {
    currentKingdomOrder: 0,
    currentKingdomKings: [],
    hallOfFameKings: [],
    // which kings are shown as castles in the canvas
    canvasKings: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case `FETCH_CURRENT_KINGDOM_SUCCESS`: {
            const { kingdomOrder } = action
            return Object.assign({}, state, {
                currentKingdomKings: action.kings,
                currentKingdomOrder: kingdomOrder,
                // fractal 3 levels deep
                canvasKings: action.kings.slice(0, 3).map(king => ({ ...king, kingdomOrder })),
            })
        }
        case `FETCH_HALL_OF_FAME_SUCCESS`: {
            return Object.assign({}, state, {
                hallOfFameKings: action.kings,
            })
        }
        default:
            return state
    }
}
