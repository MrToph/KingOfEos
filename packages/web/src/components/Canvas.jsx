import { Header, Icon } from 'semantic-ui-react'
import { initCanvas } from '../threejs'
import { primaryColor } from '../theme'
import { resolveScopedStyles } from '../utils'

const headerStyles = resolveScopedStyles(
    <scope>
        <style jsx>{`
            h2 {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
            }
        `}</style>
    </scope>,
)

export default class Canvas extends React.Component {
    shouldComponentUpdate() {
        return false
    }

    onRef = ref => {
        this.canvas = ref
        initCanvas(this.canvas)
    }

    render() {
        return (
            <div className="container">
                <canvas className="canvas" ref={this.onRef} />
                <Header
                    as="h2"
                    className={headerStyles.className}
                    icon
                    color="red"
                    textAlign="center"
                >
                    <Icon name="chess king" color="red" />
                    King Of EOS
                </Header>
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
                `}</style>
                {headerStyles.styles}
            </div>
        )
    }
}
