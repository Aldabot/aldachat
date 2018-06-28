import React, { Fragment } from 'react';
// redux
import { connect } from 'react-redux';
import { Row, Col, Card, InputNumber } from 'antd';
import styled, { ThemeProvider }from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { animateScroll as scroll } from 'react-scroll';
// Design
import theme from '../theme'
// Intl
import { injectIntl, defineMessages } from 'react-intl';
// Components
import Messages from '../component/chatMessages'
const { Meta } = Card;

const InputNumberStyled = styled(InputNumber)`
  width: 100% !important;
`;

const QuickReply = styled.button`
  font-size: ${props => props.theme.fontSize};
  border-radius: 15px;
  border-color: #0072ff;
  color: #0072ff;
  background-color: white;
  margin: 2px 10px 0 0;
  float: left;
  &:hover {
    color: white;
    background-color: #0072ff;
    cursor: pointer;
  }
`;

const AldaCard = styled(Card)`
  & .ant-card-cover img {
    border-radius: 15px 15px 0 0 !important;
  }
  border-radius: 15px !important;
  & ul {
    border-radius: 15px;
  }
  & ul li {
    display: block;
    width: 100% !important;
    margin: 0;
  }
  & ul li span {
    width: 100%;
  }
  & ul li:last-child span button {
    border-radius: 0 0 15px 15px !important;
  }

  & table {
    width: 100%;
    margin-top: 10px;
    font-size: ${props => props.theme.fontSizeSmall};
  }
`;

const CardButton = styled.button`
  display: block;
  width: 100%;
  font-size: 20px;
  color: ${props => props.theme.primaryColor};
  border-width: 0 0 1px 0;
  border-color: ${props => props.theme.gray};
  background-color: white;
  & < span {
    width: 100%;
  }
  & div p a {
    width: 100%;
    color: ${props => props.theme.primaryColor} !important;
    display: block;
    padding-top: 15px;
  }
  &:hover {
    color: white;
    background-color: #0072ff;
    cursor: pointer;
  }
  &:hover div p a {
    color: white !important;
  }
`;

const ContinueButton = QuickReply.extend`
  width: 100%;
`;

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
  componentDidUpdate() {
    scroll.scrollToBottom();
  }

  _handleCardButtonPress(text, postback) {
    console.log('postback', postback);
    if(postback !== 'url') {
      this.handleButtonPress(text);
    }
  }

  _renderInputRow() {
    const { input } = this.props;
    const { show, type, buttons } = input;

    if ( show ) {
      switch(type) {
        case "button":
          const quickReplies = buttons.map((button, index) => {
            const { text } = button;

            return (
                <QuickReply onClick={() => {this._handleButtonPress(text)}} key={index} style={{ float: 'none', display: 'inline-block' }}>{text}</QuickReply>
            );
          })
          return (
            <Row type="flex" justify="left">
              <Col span={21} style={{textAlign: 'center' }} >
                {quickReplies}
              </Col>
            </Row>
          );
        default:
          return null
      }
    }
  }

  _renderCards() {
    const { cards } = this.props.input;
    const renderedCards = cards.map((card, index) => {
      const { title, subtitle, imageUrl, buttons } = card;

      const renderButtons = buttons.map((button, index) => {
        const { text, postback } = button;
        return (
          <CardButton key={index} onClick={() => {this._handleCardButtonPress(text, postback)}}>
            <ReactMarkdown source={text}   renderers={{link : props => <a href={props.href} target="_blank">{props.children}</a>}} />
          </CardButton>
        );
      });

      return (
        <Col span={24} md={11} key={index} style={{ marginBottom: '4.16%' }}>
          <AldaCard
            cover={<img alt="example" src={imageUrl} />}
            actions={renderButtons}
          >
            <Meta
              title={title}
              description={<ReactMarkdown source={subtitle} />}
            />
          </AldaCard>
        </Col>
      )
    });

    return (
      <Row type="flex" justify="space-around" align="middle">
          {renderedCards}
          <Col span={24}>
            <ContinueButton onClick={() => {this._handleButtonPress(this.props.intl.formatMessage(messages.cardInputContinue))}}>
              {this.props.intl.formatMessage(messages.cardInputContinue)}
            </ContinueButton>
          </Col>
      </Row>
    );
  }

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
          <Row type="flex" justify="center" style={{ position: 'fixed', bottom: 16}} >
            <Col id="chatContainer" span={24} md={10} >
              {this._renderInputRow()}
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
