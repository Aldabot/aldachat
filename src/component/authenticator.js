import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports'
import { withAuthenticator } from 'aws-amplify-react'
import { signIn } from '../actions/authenticator'

Amplify.configure(aws_exports)

class Authenticator extends Component {
    componentWillMount() {
      this.redirectIfLoggedIn()
    }

    async redirectIfLoggedIn() {
      const { authState, history } = this.props
      if (authState === 'signedIn') {
        const user = await Auth.currentUserInfo()
        this.props.signIn({ ...user })
        history.push('/')
      }
    }

    render() {
      return <Spin size="large" />
    }
}

function mapDispatchToProps(dispatch) {
  return { signIn: (user) => dispatch(signIn(user)) }
}

export default withAuthenticator(connect(null ,mapDispatchToProps)(Authenticator))
