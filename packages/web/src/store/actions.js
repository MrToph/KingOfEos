const currentKingdomNumber = 0

const currentKingdomKings = Array.from({ length: 7 }, (val, index) => ({
    account: `king${index}`,
    displayName: `The best Kingdom of the World`,
    imageUrl: `https://source.unsplash.com/random/400x300`,
    soundcloudUrl: !!(index % 2) && `https://soundcloud.com/jhfly/slopes`,
    kingOrder: index,
    claimTime: new Date(),
})).reverse()

export const fetchCurrentKingdom = () => dispatch =>
    new Promise(resolve => {
        setTimeout(
            () => resolve({ kings: currentKingdomKings, kingdomNumber: currentKingdomNumber }),
            2000,
        )
    }).then(({ kings, kingdomNumber }) =>
        dispatch({ type: `FETCH_CURRENT_KINGDOM_SUCCESS`, kings, kingdomNumber }),
    )
