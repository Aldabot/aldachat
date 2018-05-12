import React, { Component } from 'react'
import { Row, Col } from 'antd'
import theme from '../theme'
import styled from 'styled-components'
import { Motion, spring } from 'react-motion';
import CardCarousel from './chatCard'

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

const AnimatedBotMessage = (props) => {
    const { text } = props
    return (
      <Motion defaultStyle={{x: -100, y:0}} style={{x: spring(0, {stiffness: 90, damping: 10}), y: spring(1, {stiffness: 70, damping: 17})}}>
        {motionState => <BotMessage style={{transform: `translate3d(${motionState.x}px, 0, 0)`, opacity: motionState.y}}>{text}</BotMessage>}
      </Motion>
    )
}

const AnimatedHumanMessage = (props) => {
  const { text } = props
  return (
    <Motion defaultStyle={{x: 100, y:0}} style={{x: spring(0, {stiffness: 90, damping: 10}), y: spring(1, {stiffness: 70, damping: 17})}}>
      {motionState => <HumanMessage style={{transform: `translate3d(${motionState.x}px, 0, 0)`, opacity: motionState.y}}>{text}</HumanMessage>}
    </Motion>
  )
}

const Messages = (props) => {
  const { messages } = props
  const messageRows = messages.map((message, index) => {
    if(message.text) {
      const { text, human } = message
      const messageOutput = (!human) ? (
        <AnimatedBotMessage text={text} />
      ) : (
        <AnimatedHumanMessage text={text} />
      );

      return (
        <Row key={index} type="flex" justify="center">
          <Col span={24}>
            {messageOutput}
          </Col>
        </Row>
      );
    }

    if(message.cards) {
      const { cards } = message
      return (
        <Row type="flex" justify="center">
          <Col span={24}>
            <CardCarousel cards={cards} />
          </Col>
        </Row>
      )
    }

    return (null)
  });

  return messageRows
}

export default Messages
