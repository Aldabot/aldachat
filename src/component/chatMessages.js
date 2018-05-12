import React, { Component } from 'react'
import theme from '../theme'
import styled from 'styled-components'
import { Motion, spring } from 'react-motion';

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

export const AnimatedBotMessage = (props) => {
    const { text } = props
    return (
      <Motion defaultStyle={{x: -100, y:0}} style={{x: spring(0, {stiffness: 90, damping: 10}), y: spring(1, {stiffness: 70, damping: 17})}}>
        {motionState => <BotMessage style={{transform: `translate3d(${motionState.x}px, 0, 0)`, opacity: motionState.y}}>{text}</BotMessage>}
      </Motion>
    )
}

export const AnimatedHumanMessage = (props) => {
  const { text } = props
  return (
    <Motion defaultStyle={{x: 100, y:0}} style={{x: spring(0, {stiffness: 90, damping: 10}), y: spring(1, {stiffness: 70, damping: 17})}}>
      {motionState => <HumanMessage style={{transform: `translate3d(${motionState.x}px, 0, 0)`, opacity: motionState.y}}>{text}</HumanMessage>}
    </Motion>
  )
}
