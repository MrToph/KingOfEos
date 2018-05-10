import '@kingofeos/theme/dist/semantic.min.css'
import '@kingofeos/theme/dist/themes/default/assets/fonts/icons.eot'
import '@kingofeos/theme/dist/themes/default/assets/fonts/icons.woff'
import '@kingofeos/theme/dist/themes/default/assets/fonts/icons.woff2'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Head from 'next/head'
import { siteBackgroundColor, backgroundGradient } from '../src/theme'
import { Canvas, CurrentKingdom, Explanation, HallOfFame, FAQ } from '../src/components/index'
import withRedux from '../src/utils/withRedux'
import { initStore } from '../src/store'
import { fetchCurrentKingdom, fetchHallOfFame } from '../src/store/actions'

class Index extends React.Component {
    static propTypes = {
        fetchCurrentKingdomAction: PropTypes.func.isRequired,
        fetchHallOfFameAction: PropTypes.func.isRequired,
        currentKingdomKings: PropTypes.array.isRequired,
        currentKingdomOrder: PropTypes.number.isRequired,
        hallOfFameKings: PropTypes.array.isRequired,
        canvasKings: PropTypes.array.isRequired,
    }

    componentDidMount() {
        const { fetchHallOfFameAction, fetchCurrentKingdomAction } = this.props
        fetchCurrentKingdomAction()
        fetchHallOfFameAction()
    }

    render() {
        const {
            currentKingdomKings,
            currentKingdomOrder,
            hallOfFameKings,
            canvasKings,
        } = this.props
        return (
            <div className="root">
                <Head>
                    <link rel="stylesheet" href="/_next/static/style.css" />
                    {/* <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin /> */}
                </Head>
                <Canvas kings={canvasKings} />
                <CurrentKingdom kings={currentKingdomKings} kingdomOrder={currentKingdomOrder} />
                <div className="divider" />
                <Explanation />
                <div className="divider" />
                <HallOfFame kings={hallOfFameKings} />
                <div className="divider" />
                <FAQ />
                <style jsx>{`
                    .root {
                        background-color: ${siteBackgroundColor};
                        margin-bottom: 50px;
                    }

                    .divider {
                        width: 100%;
                        transform: skew(1.5deg, -1.5deg);
                        margin-bottom: 60px;
                        &::before {
                            content: '';
                            background-image: ${backgroundGradient};
                            height: 40px;
                            display: block;
                        }
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

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
    fetchCurrentKingdomAction: bindActionCreators(fetchCurrentKingdom, dispatch),
    fetchHallOfFameAction: bindActionCreators(fetchHallOfFame, dispatch),
})

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
