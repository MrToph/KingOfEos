import getConfig from 'next/config'
import { getKings } from '../utils/eos'
import { kingdomKingIndexSplit } from '../utils/index'
import { defaultFlagImageUrl } from '../utils/constants'
import { getImageUrl } from '../utils/fileUpload'

const { publicRuntimeConfig } = getConfig()
export const fetchRows = () => dispatch =>
    getKings()
        .then(rows => {
            const transformRows = claim => ({
                account: claim.claim.name,
                displayName: claim.claim.displayName,
                imageUrl: getImageUrl(claim.claim.image) || defaultFlagImageUrl,
                kingOrder: kingdomKingIndexSplit(claim.kingdomKingIndex).kingOrder,
                kingdomOrder: kingdomKingIndexSplit(claim.kingdomKingIndex).kingdomOrder,
                claimTime: new Date(claim.claimTime * 1000),
            })
            const kings = rows.map(transformRows)
            const currentKingdomOrder = Math.max(
                ...rows.map(claim => kingdomKingIndexSplit(claim.kingdomKingIndex).kingdomOrder),
            )

            const currentKingdomKings = kings
                .filter(king => king.kingdomOrder === currentKingdomOrder)
                .sort((king1, king2) => king2.kingOrder - king1.kingOrder)

            let hallOfFameKings = kings.filter(king => king.kingdomOrder < currentKingdomOrder)
            // filter out kings that are in the same kingdomOrder and have a lower kingOrder
            hallOfFameKings = hallOfFameKings
                .filter(king =>
                    hallOfFameKings.every(
                        otherKing =>
                            otherKing.kingdomOrder !== king.kingdomOrder ||
                            king.kingOrder >= otherKing.kingOrder, // >= because of self
                    ),
                )
                .sort((king1, king2) => king2.kingdomOrder - king1.kingdomOrder)
            return { hallOfFameKings, currentKingdomKings, kingdomOrder: currentKingdomOrder }
        })
        .then(({ currentKingdomKings, hallOfFameKings, kingdomOrder }) =>
            dispatch({
                type: `FETCH_ROWS_SUCCESS`,
                payload: { currentKingdomKings, hallOfFameKings, kingdomOrder },
            }),
        )

export const modalOpen = () => dispatch => {
    dispatch({ type: `MODAL_OPEN` })
    fetchRows()(dispatch)
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
    const memo = `${displayName};${imageId};`
    let accountName = providedAccountName

    // if there is no identity but forgetIdentity is called
    // scatter will throw "There is no identity with an account set on your Scatter instance."
    const clearIdentityPromise = scatter.identity
        ? () => scatter.forgetIdentity()
        : () => Promise.resolve()
    return clearIdentityPromise()
        .then(() => scatter.getIdentity({ accounts: [network] }))
        .then(identity => {
            if (!Array.isArray(identity.accounts) || identity.accounts.length < 1)
                throw new Error(`No identity`)
            if (identity.accounts.find(({ name }) => name === providedAccountName)) {
                accountName = providedAccountName
            } else {
                accountName = identity.accounts[0].name
            }
        })
        .then(() => scateos.contract(`eosio.token`))
        .then(contract =>
            contract
                .transfer(
                    accountName,
                    publicRuntimeConfig.EOS_CONTRACT_NAME,
                    `${claimPrice} EOS`,
                    memo,
                )
                .catch(error => {
                    let errorMessage = ``
                    if (typeof error === `object`) errorMessage = error.message
                    else {
                        const innerError = JSON.parse(error).error
                        errorMessage =
                            innerError.details.length > 0
                                ? innerError.details
                                      .map(({ message }) => message)
                                      .join(`;`)
                                      .replace(`condition: assertion failed: `, ``)
                                : innerError.what
                    }
                    if (errorMessage.trim() === `unknown key:`) errorMessage = `No such account`
                    throw new Error(errorMessage)
                }),
        )
        .then(resolve => {
            modalClose()(dispatch)
            // wait 2 seconds to make block irreversible
            setTimeout(resolve, 2000)
        })
        .then(() => {
            // and then fetch new kings
            fetchRows()(dispatch)
        })
        .catch(err =>
            // logout on error and re-throw the error
            scatter.forgetIdentity().then(() => {
                throw err
            }),
        )
}
