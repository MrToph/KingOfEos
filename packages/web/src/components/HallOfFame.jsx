import { Header, Icon, Table } from 'semantic-ui-react'
import ImageLazy from './ImageLazy'
import { kingOrderToPrice, openUrl, kingImageTableStyles, floatingImageStyles } from '../utils'

const kings = Array.from({ length: 7 }, (val, index) => ({
    account: `king${index}`,
    displayName: `The best Kingdom of the World`,
    imageUrl: `https://source.unsplash.com/random/400x300`,
    soundcloudUrl: !!(index % 2) && `https://soundcloud.com/jhfly/slopes`,
    kingOrder: 5 + index,
    kingdomOrder: index,
    claimTime: new Date(),
})).reverse()

// background: circles corresponding to kings, circle is image lightened up, parallax effect when scrolling
// with bubble force layout?

export default class HallOfFame extends React.Component {
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
                        margin-bottom: 40px;
                        // background-color: whitesmoke;
                    }
                `}</style>
                {kingImageTableStyles.styles}
                {floatingImageStyles.styles}
            </div>
        )
    }
}
