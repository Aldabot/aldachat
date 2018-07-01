import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router'
import { withRouter } from 'react-router-dom'
import { Layout, Spin, Row, Col } from 'antd'
import styled from 'styled-components'

// Components
import Authenticator from './components/authenticator'
import { addMessage } from './actions/index'
import Menu from './components/menu'
import Home from './components/home'
import ChatMessages from './containers/chatMessages.js'
import Company from './components/company'
import FAQ from './components/faq'
import Privacy from './components/privacy'
import Security from './components/security'
import Footer from './components/footer'
import ChatFooter from './components/chatFooter.js'

// Amplify
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from './aws-exports'
import Instagram from './utils/authentificationTheme.js'

// Redux
import {
  signIn,
  signOut
} from './actions/authenticator'
import {
  setInputTypeToText
} from './actions/index.js'

// Styling
import './App.less';
import WebFont from 'webfontloader';
WebFont.load({
  google: {
    families: ['Open Sans', 'sans-serif']
  }
})

Amplify.configure(aws_exports)
const { Header, Content } = Layout

const MyHeader = styled(Header)`
  padding: 0 20px !important;
  background-color: rgba(0, 0, 0, 0) !important;
  z-index: 0;
`
const MyLayout = styled(Layout)`
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0) !important;
`
const MyContent = styled(Content)`
  padding: 0 5vw 0 5vw;
  margin-top: 20px;
`
const MyFooter = styled(Layout.Footer)`
  background-color: white !important;
  padding: 0 !important;
`

const Alda = styled.h1`
  color: ${props => props.path === '/' ? 'white' : 'black'};
  @media (min-width: 768px) {
    font-size: 4rem;
    margin-left: 2vw;
    margin-top: 2vw;
  }
`

class Web extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      user: {},
      isLoading: true
    }

    this.signOut = this.signOut.bind(this)
  }

  async componentDidMount() {
    // chk if user logged in
    // -> send greeting
    const user = await Auth.currentUserInfo()

    if(user) {
      this.props.signIn(user)
      if(!this.props.hasMessages) {
        this.props.addMessage({ text: `Hola, ${user.username} 😍😍😍` })
        this.props.addMessage({ text: '¿En que puedo ayudarte?' })
      }
      this.setState({
        isLoading: false,
        user,
        isLoggedIn: true
      })
    } else {
      this.props.signOut()
      if(!this.props.hasMessages) {
        this.props.addMessage({ text: '¡Enhorabuena! Acabas de dar con la mejor asesora financiera de España' })
        this.props.addMessage({ text: 'Por ahora puedo ayudarte a buscar el préstamo que mejor se ajusta a tus necesidades o a invertir tus ahorros en función de tu perfil.' })
      }
      this.setState({ isLoading: false })
    }
  }

  async signOut() {
    await Auth.signOut()
    this.props.signOut()
    window.location.href = "/"
  }

  renderContent() {
    const { isLoading } = this.state
    if (isLoading) {
      return <Spin size="large"/>
    }

    return (
      <Fragment>
        <Route exact path="/" component={Home}/>
        <Route exact path="/chat" component={ChatMessages}/>
        <Route exact path="/company" component={Company} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/authenticator" render={() => <Authenticator theme={Instagram} />} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/security" component={Security} />
      </Fragment>
    )
  }

  renderFooter() {
    const { router } = this.props
    return (
      <Fragment>
        <Switch>
          <Route path="/chat" render={() => <ChatFooter />}/>
          <Route path="/" render={() => <Footer router={router} />}/>
        </Switch>
      </Fragment>
    )
  }

  render() {
    const { isLoggedIn } = this.state
    const { router } = this.props

    return (
      <MyLayout>
        <MyHeader>
          <Row type="flex" justify="space-between">
            <Col>
              <Alda path={router.location.pathname}>Alda</Alda>
            </Col>
            <Col style={{lineHeight: '64px'}}>
              <Menu isLoggedIn={isLoggedIn} signOut={this.signOut} router={router} />
            </Col>
          </Row>
        </MyHeader>
        <MyContent>
          {this.renderContent()}
        </MyContent>
        <MyFooter>
          {this.renderFooter()}
        </MyFooter>
      </MyLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
    user: state.user,
    hasMessages: (state.messages.length > 0),
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addMessage: (message) => {dispatch(addMessage(message))},
    signIn: () => dispatch(signIn()),
    signOut: () => dispatch(signOut()),
    setInputTypeToText: () => dispatch(setInputTypeToText()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Web));

