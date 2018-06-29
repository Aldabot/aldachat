import React, { Fragment } from 'react';
// redux
import { connect } from 'react-redux';
import { Row, Col} from 'antd';
import { ThemeProvider }from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';
// Design
import theme from '../theme'
// Intl
import { injectIntl, defineMessages } from 'react-intl';
// Components
import Messages from '../component/chatMessages'

// Intl
const messages = defineMessages({
  textInputPlaceholder: {
    id: 'chat.textInputPlaceholder'
  },
  cardInputContinue: {
    id: 'chat.cardInputContinue'
  }
});

class Chat extends React.Component {
  render() {
    const { messages } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Row type="flex" justify="center">
            <Col id="chatContainer" span={24} md={10} >
              <Messages messages={messages} />
            </Col>
          </Row>
        </Fragment>
      </ThemeProvider>
    );
  }
}


const mapStateToProps = state => ({
  input: state.input,
  messages: state.messages,
})

const ConnectedChat = connect(
  mapStateToProps,
)(Chat);

export default injectIntl(ConnectedChat);
