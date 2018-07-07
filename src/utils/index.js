import moment from 'moment'

/* eslint-disable no-bitwise */
export const kingdomKingIndexSplit = kingdomKingIndex => ({
    kingOrder: kingdomKingIndex & 0xff,
    kingdomOrder: kingdomKingIndex >> 8,
})
/* eslint-enable no-bitwise */

// exact approximation of the actual C smart contract prices until kingOrder = 83
export const kingOrderToPrice = kingOrder => {
    const price = 1.35 ** kingOrder
    // now truncate the price at 4 decimal digits
    // we need to go the ugly way with strings, because everything else will round at _some_ decimal point
    // making the results inaccurate compared with truncating
    const priceString = price.toString()
    const decimalPosition = priceString.indexOf(`.`)
    if (decimalPosition === -1) return `${priceString}.0000`

    const amountOfDecimalPlaces = priceString.length - decimalPosition - 1
    if (amountOfDecimalPlaces >= 4) return priceString.slice(0, decimalPosition + 5)

    const padding = `0`.repeat(4 - amountOfDecimalPlaces)
    return `${priceString}${padding}`
}

export const kingdomEndDate = lastClaimTime => moment(lastClaimTime).add(7, `days`)

// https://github.com/iliakan/detect-node
export const checkServer = () =>
    Object.prototype.toString.call(global.process) === `[object process]`

export function resolveScopedStyles(scope) {
    return {
        className: scope.props.className,
        styles: scope.props.children,
    }
}

export const openUrl = url => {
    const win = window.open(url, `_blank`)
    win.focus()
}

export const floatingImageStyles = resolveScopedStyles(
    <scope>
        <style jsx>{`
            i {
                float: right;
            }
        `}</style>
    </scope>,
)

export const kingImageTableStyles = resolveScopedStyles(
    <scope>
        <style jsx>{`
            img {
                object-fit: cover;
                height: 2.5em !important;
            }
        `}</style>
    </scope>,
)

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
/* eslint-disable */
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength >>= 0 // truncate if number or convert non-number to 0;
        padString = String(typeof padString !== `undefined` ? padString : ` `)
        if (this.length > targetLength) {
            return String(this)
        }
        targetLength -= this.length
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length) // append to original to ensure we are longer than needed
        }
        return padString.slice(0, targetLength) + String(this)
    }
}
/* eslint-enable */
