import PropTypes from 'prop-types'
import { Header, Icon, Table } from 'semantic-ui-react'
import ImageLazy from './ImageLazy'
import { kingOrderToPrice, openUrl, kingImageTableStyles, floatingImageStyles } from '../utils'

// background: circles corresponding to kings, circle is image lightened up, parallax effect when scrolling
// with bubble force layout?

export default class HallOfFame extends React.PureComponent {
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

    // eslint-disable-next-line no-unused-vars
    handleViewKingdom = kingdomOrder => {
        // init WebGL
        // scroll to top
    }

    renderKingRow = king => (
        <Table.Row key={king.account}>
            <Table.Cell>
                <Header as="h4">
                    <Header.Content>
                        {king.kingdomOrder}
                        <Icon
                            onClick={() => this.handleViewKingdom(king.kingdomOrder)}
                            className={floatingImageStyles.className}
                            link
                            name="eye"
                        />
                        <Header.Subheader>{king.claimTime.toLocaleDateString()}</Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>
                <Header as="h4" image>
                    <ImageLazy
                        src={king.imageUrl}
                        size="mini"
                        rounded
                        className={kingImageTableStyles.className}
                    />
                    <Header.Content>
                        {king.account}
                        {king.soundcloudUrl && (
                            <Icon
                                onClick={() => openUrl(king.soundcloudUrl)}
                                className={floatingImageStyles.className}
                                link
                                name="soundcloud"
                            />
                        )}
                        <Header.Subheader>{king.displayName}</Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{`${kingOrderToPrice(king.kingOrder)} EOS`}</Table.Cell>
        </Table.Row>
    )

    render() {
        const { kings } = this.props
        return (
            <div className="hallOfFame">
                <Header as="h2" icon textAlign="center">
                    <Icon name="flag" />
                    Hall Of Fame
                </Header>
                <Table basic="very" striped collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Kingdom #</Table.HeaderCell>
                            <Table.HeaderCell>Eternal Ruler</Table.HeaderCell>
                            <Table.HeaderCell>Throne Price</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>{kings.map(this.renderKingRow)}</Table.Body>
                </Table>
                <style jsx>{`
                    .hallOfFame {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 50px;
                        // background-color: whitesmoke;
                    }
                `}</style>
                {kingImageTableStyles.styles}
                {floatingImageStyles.styles}
            </div>
        )
    }
}
