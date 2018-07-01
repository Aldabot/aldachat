import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports'
import { withAuthenticator } from 'aws-amplify-react'
import { signIn } from '../actions/authenticator'
import { withRouter } from 'react-router'

Amplify.configure(aws_exports)

class Authenticator extends Component {
  constructor(props) {
    super(props)
    this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this)
  }

  componentWillMount() {
    this.redirectIfLoggedIn()
  }

  async redirectIfLoggedIn() {
    console.log(this.props)
    const { authState } = this.props
    if (authState === 'signedIn') {
      const user = await Auth.currentUserInfo()
      this.props.signIn({ ...user })
      window.location.href = "/chat"
    }
  }

  render() {
    return <Spin size="large" />
  }
}

function mapDispatchToProps(dispatch) {
  return { signIn: (user) => dispatch(signIn(user)) }
}

export default withAuthenticator(withRouter(connect(null ,mapDispatchToProps)(Authenticator)))
