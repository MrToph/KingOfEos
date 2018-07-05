import { getKings } from '../utils/eos'
import { kingdomKingIndexSplit } from '../utils/index'
import { defaultFlagImageUrl } from '../utils/constants'
import { getImageUrl } from '../utils/fileUpload'

/* eslint-disable import/no-mutable-exports */
let fetchCurrentKingdom
let fetchHallOfFame

if (process.env.NODE_ENV.toLowerCase() === `test`) {
    const currentKingdomOrder = 0

    const currentKingdomKings = Array.from({ length: 7 }, (val, index) => ({
        account: `king${index}`,
        displayName: `The best Kingdom of the World`,
        imageUrl: `https://source.unsplash.com/random/400x300`,
        kingOrder: index,
        claimTime: new Date(),
    })).reverse()

    const hallOfFameKings = Array.from({ length: 7 }, (val, index) => ({
        account: `king${index}`,
        displayName: `The best Kingdom of the World`,
        imageUrl: `https://source.unsplash.com/random/400x300`,
        kingOrder: 5 + index,
        kingdomOrder: index,
        claimTime: new Date(),
    })).reverse()

    fetchCurrentKingdom = () => dispatch =>
        new Promise(resolve => {
            setTimeout(
                () =>
                    resolve({
                        kings: currentKingdomKings,
                        kingdomOrder: currentKingdomOrder,
                    }),
                2000,
            )
        })
            .then(({ kings, kingdomOrder }) =>
                dispatch({ type: `FETCH_CURRENT_KINGDOM_SUCCESS`, kings, kingdomOrder }),
            )
            // eslint-disable-next-line no-console
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
                        imageUrl: getImageUrl(claim.claim.image) || defaultFlagImageUrl,
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
                        imageUrl: getImageUrl(claim.claim.image) || defaultFlagImageUrl,
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
                                king.kingOrder >= otherKing.kingOrder, // >= because of self
                        ),
                    )
                    .sort((king1, king2) => king2.kingdomOrder - king1.kingdomOrder)
                return { kings }
            })
            .then(({ kings }) => dispatch({ type: `FETCH_HALL_OF_FAME_SUCCESS`, kings }))
}

export { fetchCurrentKingdom, fetchHallOfFame }

export const modalOpen = () => dispatch => {
    dispatch({ type: `MODAL_OPEN` })
    fetchCurrentKingdom()(dispatch)
    dispatch({ type: `MODAL_LOADING_DONE` })
}

export const modalClose = () => dispatch => dispatch({ type: `MODAL_CLOSE` })

export const scatterLoaded = scatter => dispatch =>
    dispatch({ type: `SCATTER_LOADED`, payload: scatter })

export const scatterClaim = ({
    accountName: providedAccountName,
    displayName,
    imageId,
    claimPrice,
}) => (dispatch, getState) => {
    const { scatter, network, scateos } = getState().scatter
    // dispatch({ type: `SCATTER_LOADED` })
    const memo = `${displayName};${imageId}`
    let accountName = providedAccountName
    console.log({
        accountName,
        displayName,
        imageId,
        claimPrice,
    })
    console.log(scatter.identity)
    // if there is no identity but forgetIdentity is called
    // scatter will throw "There is no identity with an account set on your Scatter instance."
    const clearIdentityPromise = scatter.identity ? () => scatter.forgetIdentity() : () => Promise.resolve()
    return clearIdentityPromise().then(() => {
        return scatter.getIdentity({ accounts: [network] })
    })
        .then(identity => {
            if (!Array.isArray(identity.accounts) || identity.accounts.length < 1) return
            if (identity.accounts.find(({ name }) => name === providedAccountName)) {
                accountName = providedAccountName
            } else {
                accountName = identity.accounts[0].name
            }
        })
        .then(() => scateos.contract(`eosio.token`))
        .then(contract =>
            contract.transfer(accountName, `kingofeos`, `${claimPrice} SYS`, memo).catch(error => {
                let errorMessage = ``
                if (typeof error === `object`) errorMessage = error.message
                else
                    errorMessage = JSON.parse(error).error.details[0].message.replace(
                        `condition: assertion failed: `,
                        ``,
                    )
                if (errorMessage.trim() === `unknown key:`) errorMessage = `No such account`
                throw new Error(errorMessage)
            }),
        )
        .then((resolve) => {
            console.log(`success`)
            modalClose()(dispatch)
            // wait 2 seconds to make block irreversible
            setTimeout(resolve, 2000)
        })
        .then(() => {
            // and then fetch new kings
            fetchCurrentKingdom()(dispatch)
        })
        .catch(err =>
            // logout on error and re-throw the error
            scatter.forgetIdentity().then(() => {
                throw err
            }),
        )
}
