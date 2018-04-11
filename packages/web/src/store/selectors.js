import { kingOrderToPrice } from '../utils'

export const selectCurrentClaimPrice = state =>
    kingOrderToPrice(Math.max(...state.currentKingdomKings.map(({ kingOrder }) => kingOrder)) + 1)
