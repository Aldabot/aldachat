import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Spin, Row, Col } from 'antd'
import styled from 'styled-components'

// Components
import Chat from './containers/Chat.js'
import Authenticator from './component/authenticator'
import { addMessage } from './actions/index'
import MyMenu from './component/menu'

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

Amplify.configure(aws_exports)
const { Header, Content } = Layout

const MyHeader = styled(Header)`
  background-color: white !important;
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
      this.props.addMessage({ content: '¡Enhorabuena! Acabas de dar con la mejor asesora financiera de España' })
      this.props.addMessage({ content: 'Por ahora puedo ayudarte a buscar el préstamo que mejor se ajusta a tus necesidades o a invertir tus ahorros en función de tu perfil.' })
      this.setState({ isLoading: false })
    } else {
      this.props.signIn(user)
      this.props.addMessage({ content: `Hola, ${user.username} 😍😍😍` })
      this.props.addMessage({ content: '¿En que puedo ayudarte?' })
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
        <Route exact path="/" component={Chat}/>
        <Route exact path="/authenticator" component={Authenticator} />
      </Fragment>
    )
  }

  render() {
    const { isLoggedIn } = this.state
    const { router } = this.props

    return (
      <Layout>
        <MyHeader>
          <Row type="flex" justify="space-between">
            <Col>
              <h1>Alda</h1>
            </Col>
            <Col style={{lineHeight: '64px'}}>
              <MyMenu isLoggedIn={isLoggedIn} signOut={this.signOut} router={router} />
            </Col>
          </Row>
        </MyHeader>
        <Content style={{backgroundColor: 'white', paddingTop: '16px', textAlign: 'center'}}>
          {this.renderContent()}
        </Content>
      </Layout>
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
