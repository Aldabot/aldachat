import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { withRouter } from 'react-router-dom'
import { Divider, Layout, Spin, Row, Col } from 'antd'
import styled from 'styled-components'

// Components
import Authenticator from './component/authenticator'
import { addMessage } from './actions/index'
import Menu from './component/menu'
import Home from './component/home'
import Company from './component/company'
import FAQ from './component/faq'
import Privacy from './component/privacy'
import Security from './component/security'
import Footer from './component/footer'

// Amplify
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from './aws-exports'

// Redux
import {
  signIn,
  signOut
} from './actions/authenticator'

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
const HeaderH1 = styled.h1`
  color: white;
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

/* function AppearBottomTop(props) {
 *   return (
 *     <Motion defaultStyle={{x: 20, y: 0}} style={{x: spring(0), y: spring(1)}}>
 *       {({x, y}) => {
 *          const style = {position: 'relative', top: x, opacity: y}
 *          return React.cloneElement(props.children, {style})
 *       }}
 *     </Motion>
 *   )
 * } */

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      user: {},
      isLoading: true
    }
  }

  async componentDidMount() {
    // chk if user logged in
    // -> send greeting
    const user = await Auth.currentUserInfo()

    if( user === null ) {
      this.props.signOut()
      this.props.addMessage({ text: '¡Enhorabuena! Acabas de dar con la mejor asesora financiera de España' })
      this.props.addMessage({ text: 'Por ahora puedo ayudarte a buscar el préstamo que mejor se ajusta a tus necesidades o a invertir tus ahorros en función de tu perfil.' })
      this.setState({ isLoading: false })
    } else {
      this.props.signIn(user)
      this.props.addMessage({ text: `Hola, ${user.username} 😍😍😍` })
      this.props.addMessage({ text: '¿En que puedo ayudarte?' })
      this.setState({
        isLoading: false,
        user,
        isLoggedIn: true
      })
    }
  }

  async signOut() {
    await Auth.signOut()
    this.props.signOut()
  }

  renderContent() {
    const { isLoading } = this.state
    if (isLoading) {
      return <Spin size="large"/>
    }

    return (
      <Fragment>
        <Route exact path="/" component={Home}/>
        <Route exact path="/company" component={Company} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/authenticator" component={Authenticator} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/security" component={Security} />
      </Fragment>
    )
  }

  render() {
    const { isLoggedIn } = this.state
    const { router } = this.props

    // if home, title.color = white else black
    console.log(router.location, router.location === '/')
    const headerStyle = router.location.pathname === '/' ? {color: 'white'} : {color: 'black'}

    return (
      <MyLayout>
        <MyHeader>
          <Row type="flex" justify="space-between">
            <Col>
              <HeaderH1 style={headerStyle}>Alda</HeaderH1>
            </Col>
            <Col style={{lineHeight: '64px'}}>
              <Menu isLoggedIn={isLoggedIn} signOut={this.signOut} router={router} />
            </Col>
          </Row>
        </MyHeader>
        <MyContent>
          {this.renderContent()}
        </MyContent>
        <Footer router={router} />
      </MyLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addMessage: (message) => {dispatch(addMessage(message))},
    signIn: () => dispatch(signIn()),
    signOut: () => dispatch(signOut())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

