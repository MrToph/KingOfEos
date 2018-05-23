import PropTypes from 'prop-types'
import moment from 'moment'
import { Statistic } from 'semantic-ui-react'
import { kingdomEndDate } from '../utils'

const deriveInitialStateFromProps = ({ lastClaimTime }) => {
    const kingdomEnd = kingdomEndDate(lastClaimTime)
    const timeLeft = moment.duration(kingdomEnd.diff(moment()))
    return {
        timeLeft,
    }
}

const formatDuration = d =>
    `${d.days()}:${[d.hours(), d.minutes(), d.seconds()]
        .map(v => String(v).padStart(2, `0`))
        .join(`:`)}`

export default class Timer extends React.Component {
    static propTypes = {
        // eslint-disable-next-line react/no-unused-prop-types
        lastClaimTime: PropTypes.instanceOf(Date).isRequired,
    }

    constructor(props) {
        super(props)
        this.state = deriveInitialStateFromProps(props)
    }

    componentDidMount() {
        this.intervalHandle = setInterval(this.tick, 1000)
    }

    componentWillReceiveProps(nextProps) {
        clearInterval(this.intervalHandle)
        this.setState(deriveInitialStateFromProps(nextProps))
        this.intervalHandle = setInterval(this.tick, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalHandle)
    }

    tick = () => {
        this.setState({
            timeLeft: this.state.timeLeft.subtract(1, `s`),
        })
    }

    render() {
        const { timeLeft } = this.state
        const timeLeftFormatted = formatDuration(timeLeft)
        return (
            <Statistic size="mini">
                <Statistic.Value>{timeLeftFormatted}</Statistic.Value>
                <Statistic.Label>Days Left</Statistic.Label>
            </Statistic>
        )
    }
}
