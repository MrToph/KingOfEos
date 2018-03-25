import { primaryColor } from '../theme'

export default class Canvas extends React.Component {
    render() {
        return (
            <div className="canvas">
                <canvas />
                <style jsx>{`
                    .canvas {
                        position: relative;
                        height: calc(100vh - 10px);
                        background-color: ${primaryColor};
                        margin-bottom: 40px;

                        border-bottom-right-radius: 50% 10%;
                        border-bottom-left-radius: 50% 10%;
                    }
                `}</style>
            </div>
        )
    }
}
