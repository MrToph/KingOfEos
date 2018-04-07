export const initialState = {
    currentKingdomNumber: 0,
    currentKingdomKings: [],
    hallOfFameKings: [],
    // which kings are shown as castles in the canvas
    canvasKings: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case `FETCH_CURRENT_KINGDOM_SUCCESS`:
            return Object.assign({}, state, {
                currentKingdomKings: action.kings,
                currentKingdomNumber: action.kingdomNumber,
                canvasKings: action.kings.slice(0, 1),
            })
        case `FETCH_HALL_OF_FAME_SUCCESS`:
            return Object.assign({}, state, {
                hallOfFameKings: action.kings,
            })
        default:
            return state
    }
}
