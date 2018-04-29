import React, { Component } from 'react'
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
        return (null)
    }
}

export default withAuthenticator(Authenticator, { includeGreetings: true })
