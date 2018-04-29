import React, { Component } from 'react'
import { Spin } from 'antd'
import { withAuthenticator } from 'aws-amplify-react'

class Authenticator extends Component {
    componentWillMount() {
        this.redirectIfLoggedIn()
    }

    redirectIfLoggedIn() {
        const { authState } = this.props
        if (authState === 'signedIn') {
          window.location.href = '/'
        }
    }

    render() {
        return <Spin size="large" />
    }
}

export default withAuthenticator(Authenticator)
