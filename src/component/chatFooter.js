import React, { Component } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import InputText from '../containers/inputText.js'
import InputAction from '../containers/inputAction.js'
// Design
import theme from '../theme'

const Container = styled.div`
  position: fixed;
  z-index: 20;
  bottom: 0;
  width: 100vw;
  padding: 2vh 5vw;
`

class ChatFooter extends Component {
  render() {
    return (
        <ThemeProvider theme={theme}>
          <Container>
            <InputAction />
            <InputText />
          </Container>
        </ThemeProvider>
    )
  }
}

export default ChatFooter
