import React, { Component } from 'react'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import ChatMessages from '../containers/chatMessages.js'
import InputText from '../containers/inputText.js'
import InputAction from '../containers/inputAction.js'

injectGlobal`
  .ant-carousel {
    overflow: hidden;
  }
`

const Container = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 2vw;
`
const Content = styled.div`
  overflow: hidden;
`
const FooterAction = styled(InputAction)`
  width: 100%;
  background-color: white;
  grid-row-start: 2;
  grid-row-end: 3;
`

const StickyInputText = styled(InputText)`
  position: sticky;
  bottom: 0;
  width: 100vw;
  height: 8vh;
  background-color: white;
`

export default class Chat extends Component {
  render() {
    return (
      <Container>
        <Content>
          <ChatMessages />
        </Content>
        <FooterAction />
        <StickyInputText />
      </Container>
    )
  }
}
