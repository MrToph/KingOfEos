export const initialState = {
    currentKingdomOrder: 0,
    currentKingdomKings: [],
    hallOfFameKings: [],
    // which kings are shown as castles in the canvas
    canvasKings: [],
    modal: {
        open: false,
        loading: false,
        error: ``,
    },
}

const modalReducer = (modalState, action) => {
    switch (action.type) {
        case `MODAL_OPEN`: {
            return {
                ...modalState,
                open: true,
                loading: true,
            }
        }
        case `MODAL_CLOSE`: {
            return {
                ...modalState,
                open: false,
            }
        }
        case `MODAL_LOADING_DONE`: {
            return {
                ...modalState,
                loading: false,
            }
        }
        default:
            return modalState
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case `FETCH_CURRENT_KINGDOM_SUCCESS`: {
            const { kingdomOrder } = action
            return {
                ...state,
                currentKingdomKings: action.kings,
                currentKingdomOrder: kingdomOrder,
                // fractal 3 levels deep
                canvasKings: action.kings.slice(0, 3).map(king => ({ ...king, kingdomOrder })),
            }
        }
        case `FETCH_HALL_OF_FAME_SUCCESS`: {
            return {
                ...state,
                hallOfFameKings: action.kings,
            }
        }
        case `MODAL_OPEN`:
        case `MODAL_CLOSE`:
        case `MODAL_LOADING_DONE`: {
            return {
                ...state,
                modal: modalReducer(state.modal, action),
            }
        }
        default:
            return state
    }
}
