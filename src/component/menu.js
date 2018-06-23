import React, { Component } from 'react';
import styled from 'styled-components'
import { StaggeredMotion, spring } from 'react-motion'
import { Menu, Icon, Row, Col, Popover } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'

const TabBar = styled(Row)`
  position: fixed !important;
  bottom: 0;
  left: 0;
  background-color: red;
  width: 100vw;
  z-index: 100;
`

const Tab = styled(Col)`
  padding: 5px !important;
  text-align: center !important;
`

const TabIcon = styled(Icon)`
  font-size: 2rem;
`

export class TabBarMenu extends Component {
  render() {
    return (
      <TabBar type="flex" justify="space-between" align="middle">
        <Tab span={4}>
          <Link to="/">
            <TabIcon type="home" />
          </Link>
        </Tab>
        <Tab span={4}>
          <Link to="/authenticator">
            <TabIcon type="question" />
          </Link>
        </Tab>
        <Tab span={4}>
          <Link to="/authenticator">
            <TabIcon type="team" />
          </Link>
        </Tab>
        <Tab span={4}>
          <Link to="/authenticator">
            <TabIcon type="book" />
          </Link>
        </Tab>
        <Tab span={4}>
          <Link to="/authenticator">
            <TabIcon type="unlock" />
          </Link>
        </Tab>
      </TabBar>
    )
  }
}

const BurgerIcon = styled(Icon)`
  font-size: 1.5rem;
  padding: 10px;
`

class ResponsiveNav extends Component {
  state = {
    viewportWidth: 0,
    isMenuVisible: false
  }

  componentDidMount() {
    this.saveViewportDimensions()
    window.addEventListener('resize', this.saveViewportDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.saveViewportDimensions)
  }

  handleMenuVisibility = (isMenuVisible) => {
    this.setState({ isMenuVisible })
  }

  saveViewportDimensions = throttle(() => {
    this.setState({
      viewportWidth: window.innerWidth
    })
  }, this.props.applyViewPortChange)

  render() {
    const {isLoggedIn, signOut, router} = this.props
    const { isMenuVisible, viewportWidth } = this.state
    const mobileBreakpoint = 767

    if (viewportWidth > mobileBreakpoint) {
      return <MyMenu
               isLoggedIn={isLoggedIn}
               signOut={signOut}
               router={router}/>
    }

    return (
      <Popover
        content={
          <MyMenu
            isLoggedIn={isLoggedIn}
                       signOut={signOut}
                       router={router}
          mobileVersion={true}
          />
        }
        trigger='click'
        visible={isMenuVisible}
        placement="topLeft"
        onVisibleChange={this.handleMenuVisibility}
      >
        {isMenuVisible ? <BurgerIcon type='menu-fold' /> : <BurgerIcon type='menu-unfold' />}
      </Popover>
    )
  }
}
ResponsiveNav.propTypes = {
  mobileBreakPoint: PropTypes.number.isRequired
}



class MyMenu extends Component {
  menuSelect(item) {
    const { key } = item
    if(key === 'signOut') {
      this.props.signOut()
    }
  }

  render() {
    const { mobileVersion, router, isLoggedIn} = this.props
    const { location } = router;

    const selectedKeys = [];
    switch(location.pathname) {
      case '/':
        selectedKeys.push('home')
        break
      case '/chat':
        selectedKeys.push('chat')
        break
      case '/company':
        selectedKeys.push('company')
        break
      case '/faq':
        selectedKeys.push('faq')
        break
      case '/authenticator':
        selectedKeys.push('signIn')
        break;
      default: break;
    }

    let menuItems = [
      <Menu.Item key="home" >
        <Link to="/" >Inicio</Link>
      </Menu.Item>,
      <Menu.Item key="chat" >
        <Link to="/chat" >Chat</Link>
      </Menu.Item>,
      <Menu.Item key="company">
        <Link to="/company">Empresa</Link>
      </Menu.Item>,
      <Menu.Item key="faq">
        <Link to="/faq">FAQ</Link>
      </Menu.Item>,
      <Menu.Item key="blog">
        <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@rosinol.gabriel/alda-bot-first-3-000-customers-get-a-free-premium-year-f8c5e7ce6e47" >Blog</a>
      </Menu.Item>,
      <Menu.Item key="signIn"><Link to="/authenticator">Sign In</Link></Menu.Item>
    ]

    if(isLoggedIn) {
      menuItems = [
        <Menu.Item key="home" >
          <Link to="/" >Inicio</Link>
        </Menu.Item>,
        <Menu.Item key="chat" >
          <Link to="/chat" >Chat</Link>
        </Menu.Item>,
        <Menu.Item key="company">
          <Link to="/company">Empresa</Link>
        </Menu.Item>,
        <Menu.Item key="faq">
          <Link to="/faq">FAQ</Link>
        </Menu.Item>,
        <Menu.Item key="blog">
          <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@rosinol.gabriel/alda-bot-first-3-000-customers-get-a-free-premium-year-f8c5e7ce6e47" >Blog</a>
        </Menu.Item>,
        <Menu.Item key="signOut">Sign Out</Menu.Item>
      ]
    }


    return (
      <StaggeredMotion
        defaultStyles={[{y: 30, opacity: 0}, {y: 30, opacity: 0}, {y: 30, opacity: 0}, {y: 30, opacity: 0}, {y: 30, opacity: 0}, {y: 30, opacity: 0}]}
        styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
            return i === 0
                 ? {y: spring(0), opacity: spring(1) }
                 : {y: spring(prevInterpolatedStyles[i - 1].y), opacity: spring(prevInterpolatedStyles[i - 1].opacity)}
        })}>
        {interpolatingStyles =>
          <Menu
            mode={mobileVersion ? 'vertical' : 'horizontal'}
            defaultSelectedKeys={['home']}
            selectedKeys={selectedKeys}
            onSelect={this.menuSelect}
            style={{lineHeight: '64px'}}
            inlineCollapsed={false}
            >
            {interpolatingStyles.map((style, i) => {
               const compStyle = {position: 'relative', top: style.y, opacity: style.opacity}
               return React.cloneElement(menuItems[i], {style: compStyle})
            })}
          </Menu>
        }
      </StaggeredMotion>
    )
  }
}

MyMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
}

export default ResponsiveNav

