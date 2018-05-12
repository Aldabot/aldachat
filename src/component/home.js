import React, { Fragment, Component } from 'react'
import IntroVideo from './introVideo'
import SecurityCarousel from './securityCarousel'
import Chat from '../containers/Chat.js'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <IntroVideo />
        <SecurityCarousel />
        <Chat />
      </Fragment>
    )
  }
}

export default Home
