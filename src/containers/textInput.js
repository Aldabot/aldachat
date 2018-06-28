import React, { Component } from 'react'
import { addMessageWithDelay } from '../actions/index.js';
import styled, { ThemeProvider } from 'styled-components'
// redux
import { connect } from 'react-redux'
// antd
import { Row, Col, Icon, Button } from 'antd';
// Design
import theme from '../theme'
const AldaIcon = styled(Icon)`
  font-size: ${props => props.theme.fontSize};
  padding: 5px;
`;
const InputRow = styled(Row)`
  margin-top: 10px;
  position: fixed;
  bottom: 10px;
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

class TextInput extends Component {
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

    return (
      <ThemeProvider theme={theme}>
        <InputRow type="flex" justify="center">
          <Col span={16}>
            <InputText
              type="text" value={inputText}
              placeholder="Escribe aqui ..." autoFocus
              onChange={this.handleTextInputOnChange}
              onKeyPress={this.handleTextInputOnKeyPress} />
          </Col>
          <Col span={4}>
            <InputButton
              onClick={() => {this.sendHumanMessage(inputText)}}
            >
              <AldaIcon type="mail" />
            </InputButton>
          </Col>
        </InputRow>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => ({
  addMessageWithDelay: msg => { dispatch(addMessageWithDelay(msg)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(TextInput)
