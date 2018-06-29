import React, { Component, Fragment } from 'react'
import ChatMessages from '../containers/chatMessages.js'
import InputText from '../containers/inputText.js'
import InputAction from '../containers/inputAction.js'

export default class TryChat extends Component {
  render() {
    return (
      <Fragment>
        <ChatMessages />
        <InputAction />
        <InputText />
      </Fragment>
    )
  }
}
