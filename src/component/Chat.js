import React from 'react';
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

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [{
        content: 'Text'
      }, {
        content: 'Text',
        human: true
      }]
    }

    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(msg) {
    const { messages } = this.state;
    messages.push(msg);
    this.setState(messages);
  }

  render() {
    const { messages } = this.state;

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

    return (
      <div>
        {messageRows}
        <button onClick={() => { this.addMessage({ content: "added" }) }}>add</button>
      </div>
    );
  }
}
