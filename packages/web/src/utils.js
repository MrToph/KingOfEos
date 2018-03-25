export const kingOrderToPrice = kingOrder => (1.35 ** kingOrder).toFixed(4)

export function resolveScopedStyles(scope) {
    return {
        className: scope.props.className,
        styles: scope.props.children,
    }
}

export const openUrl = (url) => {
    const win = window.open(url, '_blank')
    win.focus();
}