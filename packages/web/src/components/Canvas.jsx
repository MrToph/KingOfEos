import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'
import { initCanvas } from '../threejs'
import { primaryColor } from '../theme'

export default class Canvas extends React.Component {
    static propTypes = {
        kings: PropTypes.arrayOf(
            PropTypes.shape({
                account: PropTypes.string.isRequired,
                displayName: PropTypes.string.isRequired,
                imageUrl: PropTypes.string,
                soundcloudUrl: PropTypes.string,
                kingOrder: PropTypes.number.isRequired,
                kingdomOrder: PropTypes.number.isRequired,
                claimTime: PropTypes.instanceOf(Date).isRequired,
            }),
        ).isRequired,
    }

    async componentDidMount() {
        const { createCastle } = await initCanvas(this.canvas)
        this.createCastle = createCastle
        // always show at least one
        const initialCastleCount = Math.max(this.props.kings.length, 1)
        this.castles = Array.from({ length: initialCastleCount }, (_, index) =>
            this.createCastle(this.canvas, index),
        )
        this.updateCastleData(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.kings === this.props.kings) return
        // compare with CASTLES length because it can initially differs from props.kings
        // because we always want to show at least 1 castle
        const castlesDifference = Math.max(nextProps.kings.length, 1) - this.castles.length
        if (castlesDifference !== 0) {
            console.log(`componentWillReceiveprops`, castlesDifference)
            // if kings got less, trim it
            this.castles = this.castles.slice(0, nextProps.kings.length)
            // if kings got more, add them
            if (castlesDifference > 0) {
                const oldCastleLength = this.castles.length
                const newCastles = Array.from({ length: castlesDifference }, (_, index) =>
                    this.createCastle(this.canvas, oldCastleLength + index),
                )
                this.castles = [...this.castles, ...newCastles]
            }
        }
        this.updateCastleData(nextProps)
    }

    shouldComponentUpdate() {
        return false
    }

    onRef = ref => {
        this.canvas = ref
    }

    updateCastleData = props => {
        setTimeout(
            () => this.castles.forEach((castle, index) => castle.updateData(props.kings[index])),
            5000,
        )
    }

    render() {
        return (
            <div className="container">
                <canvas className="canvas" ref={this.onRef} />
                <div className="overlay">
                    {/* <Header as="h2" color="black" textAlign="center">
                        King Of EOS #0 - Some Kingdom Name
                    </Header> */}
                </div>
                <style jsx>{`
                    .container {
                        position: relative;
                        height: calc(100vh);
                        margin-bottom: 40px;
                        overflow: hidden;

                        // border-bottom-right-radius: 50% 10%;
                        // border-bottom-left-radius: 50% 10%;
                    }

                    .canvas {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                    }

                    .overlay {
                        position: absolute;
                        top: 10px;
                        left: 0;
                        right: 0;
                    }
                `}</style>
            </div>
        )
    }
}
