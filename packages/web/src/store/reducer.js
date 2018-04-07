export const initialState = {
    currentKingdomNumber: 0,
    currentKingdomKings: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case `FETCH_CURRENT_KINGDOM_SUCCESS`:
            return Object.assign({}, state, {
                currentKingdomKings: action.kings,
                currentKingdomNumber: action.kingdomNumber,
            })
        default:
            return state
    }
}
