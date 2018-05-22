import React from 'react'
import { connect, Provider } from 'react-redux'
import { checkServer } from './index'

const __NEXT_REDUX_STORE__ = `__NEXT_REDUX_STORE__`


const getOrCreateStore = (initStore, initialState) => {
    // Always make a new store if server
    if (checkServer() || typeof window === `undefined`) {
        return initStore(initialState)
    }

    // Store in global variable if client
    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initStore(initialState)
    }
    return window[__NEXT_REDUX_STORE__]
}

// used for page (=route) components
export default (...args) => Component => {
    // First argument is initStore, the rest are redux connect arguments and get passed
    const [initStore, ...connectArgs] = args

    const ComponentWithRedux = (props = {}) => {
        const { store, initialProps, initialState } = props

        // Connect page to redux with connect arguments
        const ConnectedComponent = connect(...connectArgs)(Component)

        // Wrap with redux Provider and pass store to it
        // Create connected page with initialProps
        return React.createElement(
            Provider,
            // store is {} on client-side the first time, because its functions cannot be serialized by SSR
            // however initialState can be serialized
            { store: store && store.dispatch ? store : getOrCreateStore(initStore, initialState) },
            React.createElement(ConnectedComponent, initialProps),
        )
    }

    // getInitialProps is a nextjs lifecycle method
    // For the initial page load, getInitialProps will execute on the server only.
    // getInitialProps will only be executed on the client when navigating to a different route via the Link component or using the routing APIs.
    // we use it to pass the redux store to the <Provider>
    ComponentWithRedux.getInitialProps = async (props = {}) => {
        const isServer = checkServer()
        const store = getOrCreateStore(initStore)

        // Run page getInitialProps with store and isServer
        const initialProps = Component.getInitialProps
            ? await Component.getInitialProps({ ...props, isServer, store })
            : {}

        // next passes this as props to ComponentWithRedux.constructor
        return {
            store,
            initialState: store.getState(),
            initialProps,
        }
    }

    return ComponentWithRedux
}
