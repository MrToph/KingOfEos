export const initialState = {
    currentKingdomNumber: 0,
    currentKingdomKings: [],
    hallOfFameKings: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case `FETCH_CURRENT_KINGDOM_SUCCESS`:
            return Object.assign({}, state, {
                currentKingdomKings: action.kings,
                currentKingdomNumber: action.kingdomNumber,
            })
        case `FETCH_HALL_OF_FAME_SUCCESS`:
            return Object.assign({}, state, {
                hallOfFameKings: action.kings,
            })
        default:
            return state
    }
}
