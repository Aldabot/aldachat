import React, { Fragment, Component } from 'react'
import { Divider } from 'antd'
import IntroVideo from './introVideo'
import Features from './features'
import SecurityCarousel from './securityCarousel'
import Chat from '../containers/Chat.js'
import { SectionHeader } from './sectionHeader'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <IntroVideo />
        <Features />
        <SecurityCarousel />
        <Divider />
        <SectionHeader>Pruebalo!</SectionHeader>
        <Chat />
        <div style={{ paddingBottom: '5vh' }} />
      </Fragment>
    )
  }
}

export default Home
