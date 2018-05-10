import { getKings } from '../utils/eos'
import { kingdomKingIndexSplit } from '../utils/index'
import { defaultFlagImageUrl } from '../utils/constants'

let fetchCurrentKingdom
let fetchHallOfFame

if (process.env.NODE_ENV.toLowerCase() === `test`) {
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

    fetchCurrentKingdom = () => dispatch =>
        new Promise(resolve => {
            setTimeout(
                () => resolve({ kings: currentKingdomKings, kingdomOrder: currentKingdomOrder }),
                2000,
            )
        })
            .then(({ kings, kingdomOrder }) =>
                dispatch({ type: `FETCH_CURRENT_KINGDOM_SUCCESS`, kings, kingdomOrder }),
            )
            .catch(console.error)

    fetchHallOfFame = () => dispatch =>
        new Promise(resolve => {
            setTimeout(() => resolve({ kings: hallOfFameKings }), 2000)
        }).then(({ kings }) => dispatch({ type: `FETCH_HALL_OF_FAME_SUCCESS`, kings }))
} else {
    fetchCurrentKingdom = () => dispatch =>
        getKings()
            .then(({ rows }) => {
                const currentKingdomOrder = Math.max(
                    ...rows.map(
                        claim => kingdomKingIndexSplit(claim.kingdomKingIndex).kingdomOrder,
                    ),
                )
                const kings = rows
                    .filter(
                        claim =>
                            kingdomKingIndexSplit(claim.kingdomKingIndex).kingdomOrder ===
                            currentKingdomOrder,
                    )
                    .map(claim => ({
                        account: claim.claim.name,
                        displayName: claim.claim.displayName,
                        imageUrl: claim.claim.image || defaultFlagImageUrl,
                        soundcloudUrl: claim.claim.song,
                        kingOrder: kingdomKingIndexSplit(claim.kingdomKingIndex).kingOrder,
                        claimTime: new Date(claim.claimTime),
                    }))
                    .sort((king1, king2) => king2.kingOrder - king1.kingOrder)
                return { kings, kingdomOrder: currentKingdomOrder }
            })
            .then(({ kings, kingdomOrder }) =>
                dispatch({ type: `FETCH_CURRENT_KINGDOM_SUCCESS`, kings, kingdomOrder }),
            )

    fetchHallOfFame = () => dispatch =>
        getKings()
            .then(({ rows }) => {
                const currentKingdomOrder = Math.max(
                    ...rows.map(
                        claim => kingdomKingIndexSplit(claim.kingdomKingIndex).kingdomOrder,
                    ),
                )
                let kings = rows
                    .map(claim => ({
                        account: claim.claim.name,
                        displayName: claim.claim.displayName,
                        imageUrl: claim.claim.image || defaultFlagImageUrl,
                        soundcloudUrl: claim.claim.song,
                        kingOrder: kingdomKingIndexSplit(claim.kingdomKingIndex).kingOrder,
                        kingdomOrder: kingdomKingIndexSplit(claim.kingdomKingIndex).kingdomOrder,
                        claimTime: new Date(claim.claimTime),
                    }))
                    .filter(king => king.kingdomOrder < currentKingdomOrder)
                // filter out kings that are in the same kingdomOrder and have a lower kingOrder
                kings = kings
                    .filter(king =>
                        kings.every(
                            otherKing =>
                                otherKing.kingdomOrder !== king.kingdomOrder ||
                                king.kingOrder >= otherKing.kingOrder,  // >= because of self
                        ),
                    )
                    .sort((king1, king2) => king2.kingdomOrder - king1.kingdomOrder)
                return { kings }
            })
            .then(({ kings }) => dispatch({ type: `FETCH_HALL_OF_FAME_SUCCESS`, kings }))
}

export const modalOpen = () => dispatch => {
    dispatch({ type: `MODAL_OPEN` })
    fetchCurrentKingdom()(dispatch)
    dispatch({ type: `MODAL_LOADING_DONE` })
}

export const modalClose = () => dispatch => dispatch({ type: `MODAL_CLOSE` })

export { fetchCurrentKingdom, fetchHallOfFame }
