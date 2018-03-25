import { Header, Icon, Button, Table, Label } from 'semantic-ui-react'
import ImageLazy from './ImageLazy'
import { primaryColor } from '../theme'
import { resolveScopedStyles, kingOrderToPrice, openUrl } from '../utils'

const kingdomNumber = 0
const kings = Array.from({ length: 7 }, (val, index) => ({
    account: `king${index}`,
    displayName: `The best Kingdom of the World`,
    imageUrl: `http://lorempixel.com/400/200/`,
    soundcloudUrl: !!(index % 2) && `https://soundcloud.com/jhfly/slopes`,
    kingOrder: index,
})).reverse()

const imageStyles = resolveScopedStyles(
    <scope>
        <style jsx>{`
            img {
                object-fit: cover;
                height: 2.5em !important;
            }
        `}</style>
    </scope>,
)

const soundIconStyles = resolveScopedStyles(
    <scope>
        <style jsx>{`
            i {
                float: right;
            }
        `}</style>
    </scope>,
)

export default class CurrentKingdom extends React.Component {
    renderKingRow = king => (
        <Table.Row key={king.account}>
            <Table.Cell>
                <Header as="h4" image>
                    <ImageLazy src={king.imageUrl} size="mini" rounded className={imageStyles.className} />
                    <Header.Content>
                        {king.account}
                        {king.soundcloudUrl && <Icon onClick={() => openUrl(king.soundcloudUrl)} className={soundIconStyles.className} link name="soundcloud" />}
                        <Header.Subheader>{king.displayName}</Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{`${kingOrderToPrice(king.kingOrder)} EOS`}</Table.Cell>
        </Table.Row>
    )
    render() {
        return (
            <div className="currentKingdom">
                <Header as="h2" icon textAlign="center">
                    <Icon name="settings" />
                    King Of EOS
                    <Header.Subheader>{`Kingdom #${kingdomNumber}`}</Header.Subheader>
                </Header>
                <Table basic="very" celled collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>King</Table.HeaderCell>
                            <Table.HeaderCell>Claim Price</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Label color="red" ribbon>
                                    You?
                                </Label>
                            </Table.Cell>
                            <Table.Cell>
                            <Button as='div' labelPosition='right'>
                            <Button color='red'>
                                <Icon name='chess rook' />
                                Claim
                            </Button>
                            <Label as='a' basic color='red' pointing='left'>{`${kingOrderToPrice(
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
                    }
                `}</style>
                {imageStyles.styles}
                {soundIconStyles.styles}
            </div>
        )
    }
}
