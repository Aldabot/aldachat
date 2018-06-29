import React, { Fragment, Component } from 'react'
import { Helmet } from 'react-helmet'
import { Divider } from 'antd'
import IntroVideo from './introVideo'
import Features from './features'
import SecurityCarousel from './securityCarousel'
import TryChat from '../components/tryChat.js'
import { SectionHeader } from './sectionHeader'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Alda tu asesor financiero personal!</title>
          <meta name="description" content="Introducion de Alda, tu asesor financiero personal. Alda te ayuda encontrar un prestamo o invertir tu dinero. Ademas te permite via un Chatbot de Facebook, Whatsapp o con nuestra App estar en control de todo tus financas."/>
        </Helmet>
        <IntroVideo />
        <Features />
        <SecurityCarousel />
        <Divider />
        <SectionHeader>Pruebalo!</SectionHeader>
        <TryChat />
        <div style={{ paddingBottom: '5vh' }} />
      </Fragment>
    )
  }
}

export default Home
