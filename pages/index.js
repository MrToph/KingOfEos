import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Head from 'next/head'
import { siteBackgroundColor, backgroundGradient } from '../src/theme'
import { Canvas, CurrentKingdom, Explanation, HallOfFame, FAQ } from '../src/components/index'
import { checkServer } from '../src/utils'
import withRedux from '../src/utils/withRedux'
import { initStore } from '../src/store'
import { fetchCurrentKingdom, fetchHallOfFame, scatterLoaded } from '../src/store/actions'
import '../theme/dist/semantic.min.css'
import '../theme/dist/themes/default/assets/fonts/icons.eot'
import '../theme/dist/themes/default/assets/fonts/icons.woff'
import '../theme/dist/themes/default/assets/fonts/icons.woff2'

const renderOpenGraphData = () => {
    const description = `King of EOS is a game living on the EOS blockchain. Become a king, get rich or immortalize your kingdom forever.`
    const title = `King of EOS`
    const baseUrl = `https://kingofeos.com`
    const socialImage = `static/social-image.png`
    return (
        <React.Fragment>
            <meta property={`og:image`} content={`${baseUrl}/${socialImage}`} />
            <meta property={`og:type`} content={`article`} />
            <meta poperty={`og:title`} content={title} />
            <meta property={`og:description`} content={description} />
            <meta property={`og:url`} content={baseUrl} />
            <meta property={`og:site_name`} content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content="EOS,blockchain,game" />
            <meta property={`twitter:title`} content={title} />
            <meta property={`twitter:description`} content={description} />
            <meta property={`twitter:image`} content={`${baseUrl}/${socialImage}`} />
        </React.Fragment>
    )
}

class Index extends React.Component {
    static propTypes = {
        fetchCurrentKingdomAction: PropTypes.func.isRequired,
        fetchHallOfFameAction: PropTypes.func.isRequired,
        scatterLoadedAction: PropTypes.func.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        currentKingdomKings: PropTypes.array.isRequired,
        currentKingdomOrder: PropTypes.number.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        hallOfFameKings: PropTypes.array.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        canvasKings: PropTypes.array.isRequired,
    }

    componentDidMount() {
        if (!checkServer()) {
            const { fetchHallOfFameAction, fetchCurrentKingdomAction } = this.props
            fetchCurrentKingdomAction()
            fetchHallOfFameAction()
            if (window.scatter) this.onScatterLoad()
            else document.addEventListener(`scatterLoaded`, this.onScatterLoad)
        }
    }

    componentWillUnmount() {
        if (!checkServer()) {
            document.removeEventListener(`scatterLoaded`, this.onScatterLoad)
        }
    }

    onScatterLoad = () => {
        // Scatter will now be available from the window scope.
        // At this stage the connection to Scatter from the application is
        // already encrypted.
        const scatter = window.scatter
        // It is good practice to take this off the window once you have
        // a reference to it.
        window.scatter = null
        this.props.scatterLoadedAction(scatter)
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
                    <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
                    {/* <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin /> */}
                    {renderOpenGraphData()}
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
    scatterLoadedAction: bindActionCreators(scatterLoaded, dispatch),
})

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
