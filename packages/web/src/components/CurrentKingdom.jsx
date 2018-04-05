import { Header, Icon, Button, Table, Label } from 'semantic-ui-react'
import ImageLazy from './ImageLazy'
import { kingOrderToPrice, openUrl, kingImageTableStyles, floatingImageStyles } from '../utils'

const kingdomNumber = 0
const kings = Array.from({ length: 7 }, (val, index) => ({
    account: `king${index}`,
    displayName: `The best Kingdom of the World`,
    imageUrl: `https://source.unsplash.com/random/400x300`,
    soundcloudUrl: !!(index % 2) && `https://soundcloud.com/jhfly/slopes`,
    kingOrder: index,
    claimTime: new Date(),
})).reverse()

const claimCTAColor = `orange`
export default class CurrentKingdom extends React.Component {
    renderKingRow = king => (
        <Table.Row key={king.account}>
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
            <Table.Cell>
                <Header as="h4">
                    <Header.Content>
                        {`${kingOrderToPrice(king.kingOrder)} EOS`}
                        <Header.Subheader>{king.claimTime.toLocaleString()}</Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.Cell>
        </Table.Row>
    )
    render() {
        return (
            <div className="currentKingdom">
                <Header as="h2" icon textAlign="center">
                    <img src="/static/kingofeos.gif" className="icon" />
                    King Of EOS
                    <Header.Subheader>{`Kingdom #${kingdomNumber}`}</Header.Subheader>
                </Header>
                <Table basic="very" striped collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>King</Table.HeaderCell>
                            <Table.HeaderCell>Claimed</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Label color={claimCTAColor} ribbon>
                                    You?
                                </Label>
                            </Table.Cell>
                            <Table.Cell>
                                <Button as="div" size="tiny" labelPosition="right">
                                    <Button size="tiny" color={claimCTAColor}>
                                        <Icon name="chess rook" />
                                        Claim
                                    </Button>
                                    <Label
                                        as="a"
                                        basic
                                        color={claimCTAColor}
                                        pointing="left"
                                    >{`${kingOrderToPrice(
                                        Math.max(...kings.map(({ kingOrder }) => kingOrder)) + 1,
                                    )} EOS`}</Label>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                        {kings.map(this.renderKingRow)}
                    </Table.Body>
                </Table>
                <style jsx>{`
                    .currentKingdom {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 40px;
                    }
                `}</style>
                {kingImageTableStyles.styles}
                {floatingImageStyles.styles}
            </div>
        )
    }
}
