import React, { Component } from 'react'
// antd
import { Row, Col } from 'antd'
// Design
import styled, { ThemeProvider } from 'styled-components'
import theme from '../theme.js'
import { Motion, spring } from 'react-motion';
import CardCarousel from '../components/chatCard'
import { animateScroll as scroll } from 'react-scroll'

// redux
import { connect } from 'react-redux'

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

class ChatMessages extends Component {
  componentDidUpdate() {
    // scroll to bottom on every new message
    scroll.scrollToBottom();
  }

  render() {
    const { messages } = this.props
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
          <CardCarousel cards={cards} />
        )
      }

      return (null)
    });

    if(messageRows.length === 0) {
      return <div />
    }

    return (
      <ThemeProvider theme={theme}>
        <div style={{overflow: 'hidden'}}>
          {messageRows}
        </div>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = state => ({ messages: state.messages })

export default connect(mapStateToProps)(ChatMessages)
