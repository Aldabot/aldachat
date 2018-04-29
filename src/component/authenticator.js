import React, { Component, Fragment } from 'react'
import { withAuthenticator } from 'aws-amplify-react'

class Authenticator extends Component {
    componentWillMount() {
        this.redirectIfLoggedIn()
    }
    componentWillUpdate(nextProps) {
        console.log(nextProps)
    }

    redirectIfLoggedIn() {
        const { authState, history } = this.props
        if (authState === 'signedIn') {
            this.props.history.push('/')
        }
    }

    render() {
        return (null)
    }
}

export default withAuthenticator(Authenticator, { includeGreetings: true })
