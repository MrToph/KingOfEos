import { Divider, Form, Input, Button, Label, Header, Modal, Image, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { modalOpen, modalClose } from '../store/actions'
import { selectCurrentClaimPrice } from '../store/selectors'
import { claimCTAColor } from '../theme'
import { resolveScopedStyles } from '../utils'
import copyToClipboard from '../utils/copyToClipboard'

const commandStyles = resolveScopedStyles(
    <scope>
        <style jsx>{`
            pre {
                overflow-x: hidden;
                margin: 0 5px 0 0;
                padding: 0 5px;
                background-color: #f0f0f0;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        `}</style>
    </scope>,
)

const commandContainerStyles = resolveScopedStyles(
    <scope>
        <style jsx>{`
            div {
                width: 100%;
            }
        `}</style>
    </scope>,
)

class ClaimModal extends React.Component {
    static propTypes = {
        modalOpenAction: PropTypes.func.isRequired,
        modalCloseAction: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        // error coming from Scatter
        error: PropTypes.string.isRequired,
        claimPrice: PropTypes.string.isRequired,
    }

    state = {
        accountName: ``,
        displayName: ``,
        soundcloudUrlError: false,
        soundcloudUrl: ``,
        imageUrlError: false,
        imageUrl: ``,
        imageUrlSrc: `/static/kingofeos.png`,
        copyResult: ``,
    }

    getEoscCommand = () => {
        const { accountName, displayName, soundcloudUrl, imageUrl } = this.state
        const { claimPrice } = this.props
        const sanitizedAccountName = (accountName || ``).replace(/@/g, ``)
        // TODO: sanitize correctly, this doesn't work when running in a bash
        const sanitizedDisplayName = (displayName || ``).replace(/'/g, `\\'`).replace(/"/g, `\\"`)
        return `cleos push action eosio.token transfer '["${sanitizedAccountName}", "kingofeos", "${claimPrice} EOS", "${sanitizedDisplayName};${imageUrl};${soundcloudUrl}" ]' -p ${sanitizedAccountName}`
    }

    handleClose = () => {
        this.props.modalCloseAction()
    }

    handleCopyClick = () => {
        copyToClipboard(this.getEoscCommand())
            .then(() =>
                this.setState({
                    copyResult: `positive`,
                }),
            )
            .catch(() =>
                this.setState({
                    copyResult: `negative`,
                }),
            )
    }

    handleAccountNameChange = (event, { value }) => {
        this.setState({
            accountName: value,
            copyResult: ``,
        })
    }

    handleDisplayNameChange = (event, { value }) => {
        this.setState({
            displayName: value,
            copyResult: ``,
        })
    }

    handleImageError = () => {
        this.setState({
            imageUrlSrc: `/static/kingofeos.png`,
            imageUrlError: true,
        })
    }

    handleImageChange = (event, { value }) => {
        this.setState({
            imageUrl: value,
            imageUrlError: false,
            imageUrlSrc: value,
            copyResult: ``,
        })
    }

    handleSongChange = (event, { value }) => {
        this.setState({
            soundcloudUrl: value,
            soundcloudUrlError: false,
            copyResult: ``,
        })
    }

    renderClaimButton = onClick => (
        <Button onClick={onClick} as="div" size="tiny" labelPosition="right">
            <Button size="tiny" color={claimCTAColor}>
                <Icon name="chess rook" />
                Claim
            </Button>
            <Label as="a" basic color={claimCTAColor} pointing="left">{`${
                this.props.claimPrice
            } EOS`}</Label>
        </Button>
    )

    render() {
        const { open, loading, error } = this.props
        const {
            accountName,
            displayName,
            imageUrl,
            imageUrlError,
            imageUrlSrc,
            soundcloudUrl,
            soundcloudUrlError,
            copyResult,
        } = this.state
        return (
            <Modal
                open={open}
                onClose={this.handleClose}
                trigger={this.renderClaimButton(this.props.modalOpenAction)}
            >
                <Modal.Header>
                    <Header as="h3" icon textAlign="center">
                        <img src="/static/kingofeos.gif" className="icon" />
                        Become King Of EOS!
                    </Header>
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field
                                value={accountName}
                                onChange={this.handleAccountNameChange}
                                control={Input}
                                required
                                label="EOS Account"
                                placeholder="@kingofeos"
                            />
                            <Form.Field
                                value={displayName}
                                onChange={this.handleDisplayNameChange}
                                control={Input}
                                required
                                label="Kingdom Name"
                                placeholder="Name or Description of your kingdom"
                            />
                            <div className="horizontalFlex">
                                <Form.Field
                                    value={imageUrl}
                                    onChange={this.handleImageChange}
                                    error={imageUrlError}
                                    fluid
                                    control={Input}
                                    label="Flag Image"
                                    placeholder="any URL, i.e., https://kingofeos.com/static/kingofeos.png"
                                />
                                <img src={imageUrlSrc} onError={this.handleImageError} />
                            </div>
                            <Form.Field
                                value={soundcloudUrl}
                                onChange={this.handleSongChange}
                                control={Input}
                                error={soundcloudUrlError}
                                label="Soundcloud"
                                placeholder="any soundcloud URL, i.e., https://soundcloud.com/lil-dicky/freaky-friday-feat-chris-brown"
                            />
                        </Form>
                        <Divider />
                        Copy this command to become the current king:
                        <Button
                            className={commandContainerStyles.className}
                            as="div"
                            labelPosition="left"
                            onClick={this.handleCopyClick}
                        >
                            <Label
                                as="pre"
                                className={commandStyles.className}
                                basic
                                pointing="right"
                            >
                                {this.getEoscCommand()}
                            </Label>
                            <Button
                                positive={copyResult === `positive`}
                                negative={copyResult === `negative`}
                                icon
                            >
                                <Icon name="copy" />
                            </Button>
                        </Button>
                    </Modal.Description>
                </Modal.Content>
                <style jsx>{`
                    .horizontalFlex {
                        display: flex;
                        align-items: flex-end;
                        & :global(> *:first-child) {
                            flex: 1;
                        }
                    }
                    .command {
                        overflow-x: hidden;
                        margin: 0 5px 0 0;
                        padding: 0 5px;
                        background-color: #f0f0f0;
                    }
                    img {
                        // border: 1px solid rgba(34, 36, 38, 0.15);
                        outline: 0;
                        width: 135px;
                        height: 67.25px;
                        margin: 0 0 1em 1em;
                    }
                `}</style>
                {commandStyles.styles}
                {commandContainerStyles.styles}
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    ...state.modal,
    claimPrice: selectCurrentClaimPrice(state),
})

const mapDispatchToProps = dispatch => ({
    modalOpenAction: bindActionCreators(modalOpen, dispatch),
    modalCloseAction: bindActionCreators(modalClose, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClaimModal)
