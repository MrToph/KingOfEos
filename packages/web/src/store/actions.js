const currentKingdomOrder = 0

const currentKingdomKings = Array.from({ length: 7 }, (val, index) => ({
    account: `king${index}`,
    displayName: `The best Kingdom of the World`,
    imageUrl: `https://source.unsplash.com/random/400x300`,
    soundcloudUrl: index % 2 ? `https://soundcloud.com/jhfly/slopes` : ``,
    kingOrder: index,
    claimTime: new Date(),
})).reverse()

const hallOfFameKings = Array.from({ length: 7 }, (val, index) => ({
    account: `king${index}`,
    displayName: `The best Kingdom of the World`,
    imageUrl: `https://source.unsplash.com/random/400x300`,
    soundcloudUrl: index % 2 ? `https://soundcloud.com/jhfly/slopes` : ``,
    kingOrder: 5 + index,
    kingdomOrder: index,
    claimTime: new Date(),
})).reverse()

export const fetchCurrentKingdom = () => dispatch =>
    new Promise(resolve => {
        setTimeout(
            () => resolve({ kings: currentKingdomKings, kingdomOrder: currentKingdomOrder }),
            2000,
        )
    }).then(({ kings, kingdomOrder }) =>
        dispatch({ type: `FETCH_CURRENT_KINGDOM_SUCCESS`, kings, kingdomOrder }),
    )

export const fetchHallOfFame = () => dispatch =>
    new Promise(resolve => {
        setTimeout(() => resolve({ kings: hallOfFameKings }), 2000)
    }).then(({ kings }) => dispatch({ type: `FETCH_HALL_OF_FAME_SUCCESS`, kings }))

export const modalOpen = () => dispatch => {
    dispatch({ type: `MODAL_OPEN` })
    fetchCurrentKingdom()(dispatch)
    dispatch({ type: `MODAL_LOADING_DONE` })
}

export const modalClose = () => dispatch => dispatch({ type: `MODAL_CLOSE` })
