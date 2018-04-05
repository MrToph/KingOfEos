import { Header } from 'semantic-ui-react'
import { initCanvas } from '../threejs'
import { primaryColor } from '../theme'

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
