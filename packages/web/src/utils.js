export const kingOrderToPrice = kingOrder => (1.35 ** kingOrder).toFixed(4)

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
