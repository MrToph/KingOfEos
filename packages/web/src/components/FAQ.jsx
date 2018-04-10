import { Header, Icon, Container, Accordion } from 'semantic-ui-react'

export default class FAQ extends React.PureComponent {
    state = { activeIndex: 0 }

    handleClick = (event, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    renderAccordion = () => {
        const { activeIndex } = this.state
        return (
            <Container>
                <Accordion fluid styled>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                    >
                        <Icon name="dropdown" />
                        How can I become a king?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <p>
                            You need an account on the <a href="https://eos.io">EOS</a> blockchain.
                            Then you need to simply transfer the correct amount of money to the{` `}
                            <strong>kingofeos</strong> contract. (Don{`'`}t worry, if you send a
                            wrong amount not equal to the current throne claim price the transaction
                            will fail.) This can be done with any wallet. I suggest using{` `}
                            <a href="http://scatter-eos.com/">Scatter</a>, a secure Chrome extension
                            with good integration to websites. Make sure to send your kingdom
                            customizations along as the transfer memo.
                        </p>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}
                    >
                        <Icon name="dropdown" />
                        Can I customize my kingdom?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <p>
                            Yes! A king wouldn{`'`}t be a king without his castle. The castle of the
                            active king is always displayed on top of this page and can be
                            customized: You can set the <strong>name of your kingdom</strong>, and{` `}
                            <strong>upload an image</strong> which will be displayed on the flag of
                            your castle tower. Furthermore, by linking to a{` `}
                            <strong>
                                track on <a href="https://soundcloud.com">soundcloud</a>
                            </strong>
                            {` `}
                            you can give your kingdom its own vibe.
                        </p>
                        <p>
                            These customizations must be submitted{` `}
                            <strong>
                                along with the transfer claiming the throne in the memo
                            </strong>.
                        </p>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}
                    >
                        <Icon name="dropdown" />
                        Is this secure? Where is the source code?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <p>Yes, the source code is publicly available here.</p>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 3}
                        index={3}
                        onClick={this.handleClick}
                    >
                        <Icon name="dropdown" />
                        How much is the commission charge?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                        <p>
                            There is a commission charge of 5% each transfer going to me for the
                            development. This means you will still earn 130% of the price{` `}
                            <strong>you paid</strong> when someone claims your throne. (135%
                            increased throne price - 5% commission).
                        </p>
                    </Accordion.Content>
                </Accordion>
            </Container>
        )
    }

    render() {
        return (
            <div className="FAQ">
                <Header as="h2" icon textAlign="center">
                    <Icon name="question" />
                    FAQ
                </Header>
                {this.renderAccordion()}
                <style jsx>{`
                    .FAQ {
                        margin-bottom: 50px;
                    }
                `}</style>
            </div>
        )
    }
}
