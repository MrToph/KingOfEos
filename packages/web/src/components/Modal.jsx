import {
  Divider,
  Form,
  Input,
  Button,
  Label,
  Header,
  Modal,
  Image,
  Icon
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { modalOpen, modalClose } from "../store/actions";
import { selectCurrentClaimPrice } from "../store/selectors";
import { claimCTAColor } from "../theme";
import { resolveScopedStyles } from "../utils";
import fileUpload from "../utils/fileUpload";
import copyToClipboard from "../utils/copyToClipboard";

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
  </scope>
);

const commandContainerStyles = resolveScopedStyles(
  <scope>
    <style jsx>{`
      div {
        width: 100%;
      }
    `}</style>
  </scope>
);

const flagImageStyles = resolveScopedStyles(
  <scope>
    <style jsx>{`
      div {
          color: rgba(191, 191, 191, 0.87);
          border: 1px solid rgba(34, 36, 38, 0.15);
        outline: 0;
        width: 250px;
        height: 67.25px;
        padding: .67857143em 1em;
        margin: 0;
      }
    `}</style>
  </scope>
);

class ClaimModal extends React.Component {
  static propTypes = {
    modalOpenAction: PropTypes.func.isRequired,
    modalCloseAction: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    // error coming from Scatter
    error: PropTypes.string.isRequired,
    claimPrice: PropTypes.string.isRequired
  };

  state = {
    accountName: ``,
    displayName: ``,
    soundcloudUrlError: false,
    soundcloudUrl: ``,
    imageUrlError: false,
    imageUrl: ``,
    imageUrlSrc: `/static/kingofeos.png`,
    copyResult: ``
  };

  getEoscCommand = () => {
    const { accountName, displayName, soundcloudUrl, imageUrl } = this.state;
    const { claimPrice } = this.props;
    const sanitizedAccountName = (accountName || ``).replace(/@/g, ``);
    // TODO: sanitize correctly, this doesn't work when running in a bash
    const sanitizedDisplayName = (displayName || ``)
      .replace(/'/g, `\\'`)
      .replace(/"/g, `\\"`);
    return `cleos push action eosio.token transfer '["${sanitizedAccountName}", "kingofeos", "${claimPrice} EOS", "${sanitizedDisplayName};${imageUrl};${soundcloudUrl}" ]' -p ${sanitizedAccountName}`;
  };

  handleClose = () => {
    this.props.modalCloseAction();
  };

  handleCopyClick = () => {
    copyToClipboard(this.getEoscCommand())
      .then(() =>
        this.setState({
          copyResult: `positive`
        })
      )
      .catch(() =>
        this.setState({
          copyResult: `negative`
        })
      );
  };

  handleAccountNameChange = (event, { value }) => {
    this.setState({
      accountName: value,
      copyResult: ``
    });
  };

  handleDisplayNameChange = (event, { value }) => {
    this.setState({
      displayName: value,
      copyResult: ``
    });
  };

  handleImageError = () => {
    this.setState({
      imageUrlError: true
    });
  };

  handleImageUpload = files => {
    fileUpload(files[0])
      .then(url => {
        this.setState({
          imageUrl: url,
          imageUrlError: false,
          copyResult: ``
        });
      })
      .catch(err => {
        console.log(err.message || err);
        this.setState(
          {
            imageUrl: ``,
            copyResult: `error`
          },
          this.handleImageError
        );
      });
  };

  handleSongChange = (event, { value }) => {
    this.setState({
      soundcloudUrl: value,
      soundcloudUrlError: false,
      copyResult: ``
    });
  };

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
  );

  render() {
    const { open, loading, error } = this.props;
    const {
      accountName,
      displayName,
      imageUrl,
      imageUrlError,
      soundcloudUrl,
      soundcloudUrlError,
      copyResult
    } = this.state;
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
              <Form.Field>
                <label>Flag Image (Not animated, no transparency)</label>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    className={flagImageStyles.className}
                    onError={this.handleImageError}
                  />
                ) : (
                  <Dropzone
                    className={flagImageStyles.className}
                    onDrop={this.handleImageUpload}
                  >
                    <p>Drop an image here or click to select one.</p>
                  </Dropzone>
                )}
              </Form.Field>
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
            outline: 0;
            height: 67.25px;
            padding: 0;
            margin: 0;
          }
        `}</style>
        {flagImageStyles.styles}
        {commandStyles.styles}
        {commandContainerStyles.styles}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  ...state.modal,
  claimPrice: selectCurrentClaimPrice(state)
});

const mapDispatchToProps = dispatch => ({
  modalOpenAction: bindActionCreators(modalOpen, dispatch),
  modalCloseAction: bindActionCreators(modalClose, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ClaimModal);
