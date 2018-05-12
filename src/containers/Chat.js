import React from 'react';
import { connect } from 'react-redux';
import { addMessageWithDelay } from '../actions/index.js';
import { Row, Col, Card, Button, InputNumber, Icon } from 'antd';
import styled, { ThemeProvider }from 'styled-components';
import { Motion, spring } from 'react-motion';
import ReactMarkdown from 'react-markdown';
import { animateScroll as scroll } from 'react-scroll';
// Intl
import { injectIntl, defineMessages } from 'react-intl';
// Components
import CardCarousel from '../component/chatCard'
const { Meta } = Card;

const theme = {
  fontSizeSmall: '16px',
  fontSize: '20px',
  primaryColor: '#0072ff',
  gray: 'e9e9e9',
};

const AldaIcon = styled(Icon)`
  font-size: ${props => props.theme.fontSize};
  padding: 5px;
`;

const BotMessage = styled.div`
  margin-left: ${props => props.x};
  font-size: ${props => props.theme.fontSize};
  margin: 2px 0;
  min-height: 30px;
  max-width: 87.36%;
  text-align: left;
  padding: 7px 13px;
  border-radius: 15px;
  color: black;
  background-color: #f1f0f0;
  float: left;
`;

const HumanMessage = BotMessage.extend`
  float: right;
  color: white;
  background-color: #0072ff;
`;

const InputRow = styled(Row)`
  margin-top: 10px;
`;

const InputText = styled.input`
  font-size: ${props => props.theme.fontSize};
  width: 100%;
  outline: none;
  border-width: 0 0 1px 0;
  border-bottom-color: #0072ff;
`;
const InputButton = styled(Button)`
                & span {
                  font-size: ${props => props.theme.fontSize};
                }
  &:hover span {
    color: ${props => props.theme.primaryColor};
  }
`;

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
  constructor(props) {
    super(props);

    this.state = {
      inputText: ''
    }

    this._handleNumberInputOnChange = this._handleNumberInputOnChange.bind(this);
  }

  componentDidUpdate() {
    scroll.scrollToBottom();
  }

  _sendHumanMessage(text) {
    if (text !== '') {
      this.props.addMessageWithDelay({
        content: text,
        human: true
      });
      this.setState({inputText: ''});
    }
  }

  _handleNumberInputOnChange(value) {
    this.setState({ inputText: value+'€' });
  }

  _handleTextInputOnChange = (e) => {
    this.setState({inputText: e.target.value});
  }

  _handleTextInputOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      this._sendHumanMessage(this.state.inputText);
    }
  }

  _handleButtonPress(text) {
    this._sendHumanMessage(text);
  }

  _handleCardButtonPress(text, postback) {
    console.log('postback', postback);
    if(postback !== 'url') {
      this.handleButtonPress(text);
    }
  }

  _renderInputRow() {
    const { inputText } = this.state;
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
        case "number":
          return (
            <InputRow type="flex" justify="center">
              <Col span={16}>
                <InputNumberStyled
                  defaultValue={0}
                  formatter={value => `${value}€`}
                  parser={value => value.replace('€', '')}
                  onChange={this._handleNumberInputOnChange}
                  onKeyPress={this._handleInputOnKeyPress}
                />
              </Col>
              <Col span={4}>
                <InputButton onClick={() => {this._sendHumanMessage(inputText)}}><AldaIcon type="mail" /></InputButton>
              </Col>
            </InputRow>
          );
        case "card":
          return this._renderCards();
        default:
          return (
            <InputRow type="flex" justify="center">
              <Col span={16}>
                <InputText type="text" value={inputText} placeholder={this.props.intl.formatMessage(messages.textInputPlaceholder)} autoFocus
                  onChange={this._handleTextInputOnChange} onKeyPress={this._handleTextInputOnKeyPress} />
              </Col>
              <Col span={4}>
                <InputButton onClick={() => {this._sendHumanMessage(inputText)}}><AldaIcon type="mail" /></InputButton>
              </Col>
            </InputRow>
          );
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

    const messageRows = messages.map((message, index) => {
      const { content, human } = message;
      const messageOutput = (!human) ? (
        <Motion defaultStyle={{x: -100, y:0}} style={{x: spring(0, {stiffness: 90, damping: 10}), y: spring(1, {stiffness: 70, damping: 17})}}>
          {motionState => <BotMessage style={{transform: `translate3d(${motionState.x}px, 0, 0)`, opacity: motionState.y}}>{content}</BotMessage>}
        </Motion>
      ) : (
        <Motion defaultStyle={{x: 100, y:0}} style={{x: spring(0, {stiffness: 90, damping: 10}), y: spring(1, {stiffness: 70, damping: 17})}}>
          {motionState => <HumanMessage style={{transform: `translate3d(${motionState.x}px, 0, 0)`, opacity: motionState.y}}>{content}</HumanMessage>}
        </Motion>
      );

      return (
        <Row key={index} type="flex" justify="center">
          <Col span={24}>
            {messageOutput}
          </Col>
        </Row>
      );
    });


    return (
      <ThemeProvider theme={theme}>
        <Row type="flex" justify="center">
          <Col id="chatContainer" span={24} md={10} >
            {messageRows}

            {this._renderInputRow()}
          </Col>
        </Row>
      </ThemeProvider>
    );
  }
}


const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    addMessageWithDelay: msg => { dispatch(addMessageWithDelay(msg)) }
  };
}

const ConnectedChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default injectIntl(ConnectedChat);
