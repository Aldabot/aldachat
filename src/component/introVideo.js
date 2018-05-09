import React, { Component, Fragment } from 'react'
import { Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
import { Parallax, ParallaxLayer } from 'react-spring'
import styled from 'styled-components'
import phone from '../media/phone.png'
import video from '../media/300-loan.mp4'
import diamond from '../media/diamond.svg'

const Phone = styled.img`
  width: 100%;
`

const Video = styled.video`
  position: absolute;
  top: 13%;
  left: 14%;
  width: 75%;
`

const RightCol = styled(Col)`
  text-align: left;
`

const Diamond = styled.img`
  position: absolute;
  top: -70vw;
  left: -60vw;
  width: 100vw;
  z-index: -1;
`

class IntroVideo extends Component {
    render() {
        return (
          <Fragment>
          <Diamond src={diamond} />
          <Parallax ref='parallax' pages={3}>
            <Row type="flex" justify="center" align="middle">
              <Col span={8}>
                <Phone src={phone} alt="movil" />
                <Video autoPlay>
                  <source src={video} type="video/mp4"/>
                </Video>
              </Col>
              <RightCol span={8}>
                <ParallaxLayer offset={0} speed={-0.5}>
                  <h1>Alda</h1>
                  <p>Disfruta de tu propio asesor financiero y mejora ya tu situación financiera.</p>
                  <p>Regístrate gratis con solo un clic.</p>
                  <Link to="/"><Button>Sign In</Button></Link>
                </ParallaxLayer>
              </RightCol>
            </Row>
          </Parallax>
          </Fragment>
        )
    }
}

export default IntroVideo;
