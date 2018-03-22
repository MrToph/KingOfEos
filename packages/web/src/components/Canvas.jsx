import React from 'react'

export default class Canvas extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="canvas" />
                <style jsx>{`
                    .canvas {
                        position: relative;
                        height: 100vh;
                        background-color: blue;

                        border-bottom-right-radius: 50% 10%;
                        border-bottom-left-radius: 50% 10%;
                    }
                `}</style>
            </React.Fragment>
        )
    }
}
