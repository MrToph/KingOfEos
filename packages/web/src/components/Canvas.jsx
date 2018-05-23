import PropTypes from 'prop-types'
import { initCanvas } from '../threejs'

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
            this.createCastle(index),
        )
        this.updateCastleData(this.props)
    }

    componentWillReceiveProps(nextProps) {
        // remove castles or add new castles, and then update the castles data

        // this.castles is initialized in _async_ componentDidMount and might not be ready yet
        // but then it will be initialized correctly there and not here
        if (!this.castles || nextProps.kings === this.props.kings) return
        // compare with CASTLES length because it can initially differ from props.kings
        // because we always want to show at least 1 castle
        const castlesDifference = Math.max(nextProps.kings.length, 1) - this.castles.length
        if (castlesDifference !== 0) {
            // if kings got less, trim it
            this.castles = this.castles.slice(0, nextProps.kings.length)
            // if kings got more, add them
            if (castlesDifference > 0) {
                const oldCastleLength = this.castles.length
                const newCastles = Array.from({ length: castlesDifference }, (_, index) =>
                    this.createCastle(oldCastleLength + index),
                )
                this.castles = [...this.castles, ...newCastles]
            }
        }
        this.updateCastleData(nextProps)
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
        const { kings } = this.props
        const currentKing =
            kings.length > 0 ? kings[0] : { kingdomOrder: 0, displayName: `Loading` }
        return (
            <div className="container">
                <canvas className="canvas" ref={this.onRef} />
                <div className="overlay">
                    <div className="text">
                        {`King Of EOS #${currentKing.kingdomOrder} - ${currentKing.displayName}`}
                    </div>
                </div>
                <style jsx>{`
                    .container {
                        position: relative;
                        height: calc(100vh);
                        margin-bottom: 50px;
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

                    .text {
                        font-family: 'Bitter', serif;
                    }

                    .overlay {
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        font-size: 1.5em;
                        bottom: 20px;
                        color: #fff;
                        left: 0;
                        right: 0;
                        text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000,
                            -1px -1px 0 #000, 0px 1px 0 #000, 0px -1px 0 #000, -1px 0px 0 #000,
                            1px 0px 0 #000, 2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000,
                            -2px -2px 0 #000, 0px 2px 0 #000, 0px -2px 0 #000, -2px 0px 0 #000,
                            2px 0px 0 #000, 1px 2px 0 #000, -1px 2px 0 #000, 1px -2px 0 #000,
                            -1px -2px 0 #000, 2px 1px 0 #000, -2px 1px 0 #000, 2px -1px 0 #000,
                            -2px -1px 0 #000;
                    }
                `}</style>
            </div>
        )
    }
}
