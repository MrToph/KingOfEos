import { Header, Container } from 'semantic-ui-react'

export default class Disclaimer extends React.PureComponent {
    render() {
        return (
            <div className="disclaimer">
                <Header as="h2" textAlign="center">
                    Disclaimer
                </Header>
                <Container>
                    This contract's main purpose is to explore and test interactions between
                    accounts and contracts on the EOS blockchain. Don't blindly trust the
                    good-naturedness of contracts and do your own research by checking the code, its
                    intent, and its previous transactions. More importantly, don't transfer amounts
                    of money that you can't risk to lose. No refunds can and will be paid in case of
                    malfunction. The author disclaims all liability for the operation of the
                    contract which should be considered its own autonomous entity controlled by its
                    code with the intention as specified in the ricardian clauses. If for whatever
                    reason, you believe auctioning virtual kingdoms is illegal in your jurisdiction,
                    don't participate. By interacting with the contract you accept these conditions.
                </Container>
                <style jsx>{`
                    .disclaimer {
                        margin-bottom: 50px;
                    }
                `}</style>
            </div>
        )
    }
}
