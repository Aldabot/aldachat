import React, { Fragment, Component } from 'react'
import IntroVideo from './introVideo'
import SecurityCarousel from './securityCarousel'
import Chat from '../containers/Chat.js'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://axbeotjnca.execute-api.eu-west-1.amazonaws.com/dev/',
  withCredentials: true
})
instance.get('dialogflow/detectIntent')
  .then((response) => {
    console.log(response)
  }).catch((error) => {
    console.log(error)
  })


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
