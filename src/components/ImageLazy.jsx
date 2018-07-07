import PropTypes from 'prop-types'
import { Visibility, Image, Loader } from 'semantic-ui-react'

export default class ImageLazy extends React.Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        size: PropTypes.string,
    }

    static defaultProps = {
        size: `mini`,
    }

    state = {
        show: false,
    }

    showImage = () => {
        this.setState({
            show: true,
        })
    }

    render() {
        const { size } = this.props
        if (!this.state.show) {
            return (
                <Visibility as="span" fireOnMount onTopVisible={this.showImage}>
                    <Loader active inline="centered" size={size} />
                </Visibility>
            )
        }
        return <Image {...this.props} />
    }
}
