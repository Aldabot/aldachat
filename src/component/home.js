import React, { Fragment, Component } from 'react'
import IntroVideo from './introVideo'
import SecurityCarousel from './securityCarousel'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <IntroVideo />
        <SecurityCarousel />
      </Fragment>
    )
  }
}

export default Home
