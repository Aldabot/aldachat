import React, { Component } from 'react'
import { addMessageWithDelay } from '../actions/index.js';
import styled, { ThemeProvider } from 'styled-components'
// redux
import { connect } from 'react-redux'
// antd
import { Button } from 'antd';
// Design
import theme from '../theme'
const MyInputText = styled.input`
  font-size: ${props => props.theme.fontSize};
  width: 83%;
  outline: none;
  border-width: 0 0 1px 0;
  border-bottom-color: #0072ff;
`;
const MyButton = styled(Button)`
  width: 17%;
`

class InputText extends Component {
  state = {
    inputText: ''
  }

  sendHumanMessage(text) {
    if (text !== '') {
      this.props.addMessageWithDelay({
        text,
        human: true
      });
      this.setState({inputText: ''});
    }
  }

  handleTextInputOnChange = (e) => {
    this.setState({inputText: e.target.value});
  }

  handleTextInputOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.sendHumanMessage(this.state.inputText);
    }
  }

  handleButtonPress(text) {
    this.sendHumanMessage(text);
  }

  render() {
    const { inputText } = this.state
    const { className } = this.props

    return (
      <ThemeProvider theme={theme}>
        <div className={className}>
          <MyInputText
            type="text" value={inputText}
            placeholder="Escribe aqui ..." autoFocus
            onChange={this.handleTextInputOnChange}
            onKeyPress={this.handleTextInputOnKeyPress} />
          <MyButton
            onClick={() => {this.sendHumanMessage(inputText)}}
            size="large"
            type="primary"
            shape="circle"
            icon="mail"
          />
        </div>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  addMessageWithDelay: msg => { dispatch(addMessageWithDelay(msg)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(InputText)
