import ScatterJS from 'scatter-js/dist/scatter.cjs'
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { siteBackgroundColor, backgroundGradient } from '../src/theme'
import {
    Canvas,
    CurrentKingdom,
    Explanation,
    HallOfFame,
    FAQ,
    Disclaimer,
} from '../src/components/index'
import { checkServer } from '../src/utils'
import withRedux from '../src/utils/withRedux'
import { initStore } from '../src/store'
import { selectRoundsLeft, selectInitialLoadDone } from '../src/store/selectors'
import { fetchRows, scatterLoaded } from '../src/store/actions'
import '../theme/dist/semantic.min.css'
import '../theme/dist/themes/default/assets/fonts/icons.eot'
import '../theme/dist/themes/default/assets/fonts/icons.woff'
import '../theme/dist/themes/default/assets/fonts/icons.woff2'

class Index extends React.Component {
    static propTypes = {
        fetchRowsAction: PropTypes.func.isRequired,
        scatterLoadedAction: PropTypes.func.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        currentKingdomKings: PropTypes.array.isRequired,
        currentKingdomOrder: PropTypes.number.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        hallOfFameKings: PropTypes.array.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        canvasKings: PropTypes.array.isRequired,
        roundsLeft: PropTypes.number.isRequired,
        initialLoadDone: PropTypes.bool.isRequired,
    }

    componentDidMount() {
        if (!checkServer()) {
            const { fetchRowsAction } = this.props
            fetchRowsAction()
            ScatterJS.scatter
                .connect(`kingofeos`)
                .then(connected => {
                    if (connected) {
                        const { scatter } = ScatterJS
                        window.scatter = null
                        this.props.scatterLoadedAction(scatter)
                    }
                })
                .catch(console.error)
        }
    }

    render() {
        const {
            currentKingdomKings,
            currentKingdomOrder,
            hallOfFameKings,
            canvasKings,
            roundsLeft,
            initialLoadDone,
        } = this.props
        return (
            <div className="root">
                <Canvas kings={canvasKings} />
                {initialLoadDone ? (
                    <React.Fragment>
                        <CurrentKingdom
                            kings={currentKingdomKings}
                            kingdomOrder={currentKingdomOrder}
                            roundsLeft={roundsLeft}
                        />
                        <div className="divider" />
                    </React.Fragment>
                ) : null}
                <Explanation />
                <div className="divider" />
                {initialLoadDone ? (
                    <React.Fragment>
                        <HallOfFame kings={hallOfFameKings} />
                        <div className="divider" />
                    </React.Fragment>
                ) : null}
                <FAQ />
                <div className="divider" />
                <Disclaimer />
                <style jsx>{`
                    .root {
                        background-color: ${siteBackgroundColor};
                        margin-bottom: 50px;
                    }

                    .divider {
                        width: 100%;
                        transform: skew(1.5deg, -1.5deg);
                        margin-bottom: 60px;
                    }

                    .divider::before {
                        content: '';
                        background-image: ${backgroundGradient};
                        height: 40px;
                        display: block;
                    }

                    * {
                        box-sizing: border-box;
                    }
                    :global(body) {
                        margin: 0;
                        padding: 0;
                    }

                    :global(.ui.dimmer.transition) {
                        display: flex !important;
                    }

                    :global(.ui.modal) {
                        margin-top: 0 !important;
                    }
                `}</style>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    roundsLeft: selectRoundsLeft(state),
    initialLoadDone: selectInitialLoadDone(state),
})

const mapDispatchToProps = dispatch => ({
    fetchRowsAction: bindActionCreators(fetchRows, dispatch),
    scatterLoadedAction: bindActionCreators(scatterLoaded, dispatch),
})

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
