import { Header, Icon, Container, List } from 'semantic-ui-react'
import { resolveScopedStyles } from '../utils'

const listContainerStyles = resolveScopedStyles(
    <scope>
        <style jsx>{`
            @media only screen and (min-width: 768px) {
                @for $i from 0 to 3 {
                    div :global(> *:nth-child(#{$i + 1})) {
                        margin-left: ($i * 30%) !important;
                        margin-right: (2 - $i) * 30% !important;
                        // background-color: red !important;
                    }
                }
            }
        `}</style>
    </scope>,
)

export default class Explanation extends React.PureComponent {
    render() {
        return (
            <div className="explanation">
                <Container>
                    <Header as="h2" icon textAlign="center">
                        <Icon name="info" />
                        What is <em>King of EOS</em>?
                    </Header>
                    <blockquote className="quote">
                        King of EOS is a smart contract living on the{` `}
                        <a href="https://eos.io">EOS</a> blockchain. Become a <strong>king</strong>,
                        get{` `}
                        <strong>rich</strong> or <strong>immortalize your kingdom</strong> forever
                        on the blockchain.
                    </blockquote>
                    The game is simple in its rules but complex in its strategy:
                    <List className={listContainerStyles.className} ordered>
                        <List.Item>
                            Becoming a king comes at a cost. You can dethrone the current king by
                            paying <strong>1.35x</strong> the price he paid for the throne.
                        </List.Item>
                        <List.Item>
                            {` `}
                            If you are the king and someone else claims your throne,{` `}
                            <strong>you</strong>
                            {` `}
                            will get the price <strong>he</strong> paid. Meaning you will make a
                            profit of roughly a third of what you paid for the throne!
                        </List.Item>
                        <List.Item>
                            If you stay the king for <strong>7 consecutive days</strong>, the
                            kingdom will{` `}
                            <strong>be forever yours</strong> and a new kingdom will start! You will
                            be immortalized as the ruler of this kingdom on the blockchain and in
                            the <strong>Hall of Fame</strong>.
                        </List.Item>
                    </List>
                </Container>
                <style jsx>{`
                    .explanation {
                        margin-bottom: 50px;
                    }
                    .quote {
                        font-size: 1.2em;
                        line-height: 1.41;
                    }
                `}</style>
                {listContainerStyles.styles}
            </div>
        )
    }
}
