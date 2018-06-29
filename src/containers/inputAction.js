import React, { Component } from 'react'
import { addMessageWithDelay } from '../actions/index.js';
import styled from 'styled-components'
// redux
import { connect } from 'react-redux'
// antd
import { Carousel } from 'antd';

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

class InputAction extends Component {
  sendHumanMessage(text) {
    if (text !== '') {
      this.props.addMessageWithDelay({
        text,
        human: true
      });
      this.setState({inputText: ''});
    }
  }

  handleButtonPress(text) {
    this.sendHumanMessage(text);
  }

  render() {
    const { input } = this.props;
    const { show, type, buttons } = input;

    if ( show ) {
      switch(type) {
        case "button":
          const quickReplies = buttons.map((button, index) => {
            const { text } = button;

            return (
              <div>
                <QuickReply
                  onClick={() => {this.handleButtonPress(text)}}
                  key={index}
                  style={{ float: 'none', display: 'inline-block' }}>{text}
                </QuickReply>
              </div>
            );
          })
          return (
            <Carousel
              dots={false}
              variableWidth={true}
              infinite={false}
            >
              {quickReplies}
            </Carousel>
          );
        default:
          return null
      }
    }
    return null
  }
}

const mapStateToProps = state => ({ input: state.input })
const mapDispatchToProps = dispatch => ({
  addMessageWithDelay: msg => { dispatch(addMessageWithDelay(msg)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(InputAction)
