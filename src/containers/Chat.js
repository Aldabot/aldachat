import React from 'react';
import { connect } from 'react-redux';
import { addMessageWithDelay } from '../actions/index.js';
import { Row, Col } from 'antd';
import styled from 'styled-components';

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
  float: left
`

class Chat extends React.Component {
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.addMessageWithDelay({
        content: e.target.value,
        human: true
      });
    }
  }

  render() {
    console.log(this.props);
    const { messages, input } = this.props;

    const messageRows = messages.map((message, index) => {
      const { content, human } = message;
      const messageOutput = (!human) ? <BotMessage>{content}</BotMessage> : <HumanMessage>{content}</HumanMessage>;

      return (
        <div key={index}>
          <Row type="flex" justify="center">
            <Col span={12}>
              {messageOutput}
            </Col>
          </Row>
        </div>
      );
    });

    const actionRow = (input.show) ? (
      <Row type="flex" justify="center">
        <Col span={12}>
          <InputText type="text" placeholder={input.text.placeholder} autoFocus onKeyPress={this._handleKeyPress} />
        </Col>
      </Row>
    ) : (
      null
    );

    return (
      <div>
        {messageRows}
        {actionRow}
      </div>
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
