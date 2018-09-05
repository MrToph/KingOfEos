import React from 'react'
import PropTypes from 'prop-types'
import { Header, Table, Label } from 'semantic-ui-react'
import ImageLazy from './ImageLazy'
import Timer from './Timer'
import Modal from './Modal'
import { kingOrderToPrice, kingImageTableStyles, floatingImageStyles } from '../utils'
import { claimCTAColor } from '../theme'

export default class CurrentKingdom extends React.PureComponent {
    static propTypes = {
        kings: PropTypes.arrayOf(
            PropTypes.shape({
                account: PropTypes.string.isRequired,
                displayName: PropTypes.string.isRequired,
                imageUrl: PropTypes.string,
                kingOrder: PropTypes.number.isRequired,
                claimTime: PropTypes.instanceOf(Date).isRequired,
            }),
        ).isRequired,
        kingdomOrder: PropTypes.number.isRequired,
        roundsLeft: PropTypes.number.isRequired,
    }

    renderKingRow = (king, index) => (
        <Table.Row key={king.kingOrder}>
            <Table.Cell>
                <Header as={index === 0 ? `h3` : `h4`} image>
                    <ImageLazy
                        src={king.imageUrl}
                        size="mini"
                        rounded
                        className={kingImageTableStyles.className}
                    />
                    <Header.Content>
                        {king.account}
                        <Header.Subheader>{king.displayName}</Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>
                <Header as={index === 0 ? `h3` : `h4`}>
                    <Header.Content>
                        {`${kingOrderToPrice(king.kingOrder)} EOS`}
                        <Header.Subheader>{king.claimTime.toLocaleString()}</Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.Cell>
        </Table.Row>
    )

    renderBody() {
        const { kings, roundsLeft } = this.props
        const roundsLeftStyles = (
            <style jsx>{`
                .roundsLeft {
                    font-size: 1.2em;
                    line-height: 1.41;
                }
            `}</style>
        )
        if (roundsLeft <= 0) {
            return (
                <React.Fragment>
                    <p className="roundsLeft">
                        King of EOS has ended. Check the Hall of Fame for all kings!
                    </p>
                    {roundsLeftStyles}
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <p className="roundsLeft">{`Only ${roundsLeft} Kingdom${
                    roundsLeft > 1 ? `s` : ``
                } left.`}</p>
                <Timer lastClaimTime={kings.length > 0 ? kings[0].claimTime : new Date()} />
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
                                <Modal />
                            </Table.Cell>
                        </Table.Row>
                        {kings.map(this.renderKingRow)}
                    </Table.Body>
                </Table>
                {roundsLeftStyles}
            </React.Fragment>
        )
    }
    render() {
        const { kingdomOrder } = this.props
        return (
            <div className="currentKingdom">
                <Header as="h2" icon textAlign="center">
                    <img src="/static/kingofeos.gif" className="icon" />
                    King Of EOS
                    <Header.Subheader>{`Kingdom #${kingdomOrder}`}</Header.Subheader>
                </Header>
                {this.renderBody()}
                <style jsx>{`
                    .currentKingdom {
                        padding: 0 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 50px;
                    }
                `}</style>
                {kingImageTableStyles.styles}
                {floatingImageStyles.styles}
            </div>
        )
    }
}
