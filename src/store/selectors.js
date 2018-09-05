import { kingOrderToPrice } from '../utils'
import { maxNumberOfKings } from '../utils/constants'

export const selectCurrentClaimPrice = state =>
    kingOrderToPrice(Math.max(...state.currentKingdomKings.map(({ kingOrder }) => kingOrder)) + 1)

export const selectRoundsLeft = state => maxNumberOfKings - state.currentKingdomOrder

export const selectInitialLoadDone = state => state.currentKingdomOrder !== Number.MAX_SAFE_INTEGER
