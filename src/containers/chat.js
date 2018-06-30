import React, { Component } from 'react'
import styled from 'styled-components'
import ChatMessages from '../containers/chatMessages.js'
import InputText from '../containers/inputText.js'
import InputAction from '../containers/inputAction.js'

const Grid = styled.div`
  min-height: 100%;
  padding: 2vw;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr auto auto;
`

const StickyInput = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  background-color: white;
`

export default class Chat extends Component {
  render() {
    return (
      <Grid>
        <ChatMessages />
        <InputAction />
        <StickyInput>
          <InputText />
        </StickyInput>
      </Grid>
    )
  }
}
