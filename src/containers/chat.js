import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import ChatHeader from '../components/chatHeader.js'
import ChatMessages from '../containers/chatMessages.js'
import InputText from '../containers/inputText.js'
import InputAction from '../containers/inputAction.js'

const Grid = styled.div`
  min-height: 100%;
  padding: 2vw;
  width: 100%;
  display: grid;
  grid-template-rows: 7% 1fr auto auto;
`

const StickyInput = styled.div`
  position: sticky;
  bottom: -1px;
  width: 100%;
  overflow: hidden;
  background-color: white;
  margin-top: 10px;
`

export default class Chat extends Component {
  render() {
    return (
      <Fragment>
        <Grid>
          <ChatHeader />
          <ChatMessages />
          <InputAction />
          <StickyInput>
            <InputText />
          </StickyInput>
        </Grid>
      </Fragment>
    )
  }
}
