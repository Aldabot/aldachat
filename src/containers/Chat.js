import React from 'react';
import { connect } from 'react-redux';
import { addMessageWithDelay } from '../actions/index.js';
import { Row, Col, Card } from 'antd';
import styled from 'styled-components';
// carousel arrows from react-slick (slick-carousel package)
/* import 'slick-carousel/slick/slick.css'; */
import 'slick-carousel/slick/slick-theme.css';
const { Meta } = Card;

const BotMessage = styled.div`
  margin: 10px 0;
  min-height: 30px;
  max-width: 85%;
  text-align: left;
  padding: 7px 13px;
  border-radius: 15px;
  color: black;
  background-color: yellow;
  float: left;
`;

const HumanMessage = BotMessage.extend`
  float: right;
  background-color: red;
`;

const InputText = styled.input`
  float: left;
`;

const QuickReply = styled.button`
  margin-right: 20px;
  float: left;
`;

class Chat extends React.Component {
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.addMessageWithDelay({
        content: e.target.value,
        human: true
      });
    }
  }

  _handleButtonPress(text) {
    this.props.addMessageWithDelay({
      content: text,
      human: true
    });
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
                <QuickReply onClick={() => {this._handleButtonPress(text)}} key={index}>{text}</QuickReply>
            );
          })
          return (
            <Row type="flex" justify="left">
              <Col span={12}>
                {quickReplies}
              </Col>
            </Row>
          );
        case "card":
          return this._renderCardCarousel();
        default:
          return (
            <Row type="flex" justify="center">
              <Col span={12}>
                <InputText type="text" placeholder={input.text.placeholder} autoFocus onKeyPress={this._handleKeyPress} />
              </Col>
            </Row>
          );
      }
    }
  }

  _renderCardCarousel() {
    const { cards } = this.props.input;
    const renderedCards = cards.map((card, index) => {
      const { title, subtitle, imageUrl, buttons } = card;

      const renderButtons = buttons.map((button, index) => {
        const { text } = button;
        return <button key={index} onClick={() => {this._handleButtonPress(text)}}>{text}</button>
      });
      return (
        <Col span={7} key={index} style={{ marginBottom: '4.16%' }}>
          <Card
            cover={<img alt="example" src={imageUrl} />}
            actions={[renderButtons]}
          >
            <Meta
              title={title}
              description={subtitle}
            />
          </Card>
        </Col>
      )
    });
    return (
      <Row type="flex" justify="space-around">
          {renderedCards}
      </Row>
    );
  }

  render() {
    const { messages } = this.props;

    const messageRows = messages.map((message, index) => {
      const { content, human } = message;
      const messageOutput = (!human) ? <BotMessage>{content}</BotMessage> : <HumanMessage>{content}</HumanMessage>;

      return (
        <Row key={index} type="flex" justify="center">
          <Col span={24}>
            {messageOutput}
          </Col>
        </Row>
      );
    });

    return (
      <Row type="flex" justify="center">
        <Col span={12}>
          {messageRows}
          {this._renderInputRow()}
        </Col>
      </Row>
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

export default ConnectedChat;
