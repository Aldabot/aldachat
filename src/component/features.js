import React, { Component } from 'react'
import { SectionHeader } from './sectionHeader'
import { Carousel, Button, Row, Col } from 'antd'
import styled from 'styled-components'
import phone from '../media/phone.png'
import loan from '../media/300-loan.mp4'
import investment from '../media/featureInvestment.mp4'
import insights from '../media/featureInsights.mov'



const Slide = styled.div`
  position: relative;
`

const PhoneContainer = styled.div`
  position: relative;
`
const Phone = styled.img`
  width: 100%;
`
const Video = styled.video`
  position: absolute;
  top: 13%;
  left: 14.1%;
  width: 74.8%;
`

const FeatureItem = styled.div`
  font-size: 2rem;
  opacity: ${props => props.active ? 1.0 : 0.3 };
  &:after {
    content: "";
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 5px;
    position: absolute;
    background: linear-gradient(to right, #FFB3AA, #FFD0AA);
  }
`

const MobileDescription = styled.div`
  text-align: center;
  margin-bottom: 3vh;
`

const CarouselCol = styled(Col)`
  margin-top: 5vh;
`

class Features extends Component {
  state = {
    activeSlide: 0,
  }

  goToFeature(id) {
    this.slider.goTo(id)
    this.setState({activeSlide: id})
  }

  render() {
    const { activeSlide } = this.state

    return (
      <section>
        <SectionHeader>Features</SectionHeader>
        <Row type="flex" justify="space-around">
          <Col span={24} md={{span: 8}}>
            <Row type="flex" justify="space-around" align="middle">
              <Col md={{span: 24}}>
                <FeatureItem active={activeSlide === 0} onClick={() => this.goToFeature(0)}>01</FeatureItem>
              </Col>
              <Col md={{span: 24}}>
                <FeatureItem active={activeSlide === 1} onClick={() => this.goToFeature(1)}>02</FeatureItem>
              </Col>
              <Col md={{span: 24}}>
                <FeatureItem active={activeSlide === 2} onClick={() => this.goToFeature(2)}>03</FeatureItem>
              </Col>
            </Row>
          </Col>
          <CarouselCol span={24} md={{span: 8}}>
            <Carousel dots={false} ref={slider => (this.slider = slider)}>
              <Slide>
                <MobileDescription>
                  <h3>Prestamo</h3>
                  <p>Alda te busca el mejor prestamo por tu perfil</p>
                </MobileDescription>
                <PhoneContainer>
                  <Phone src={phone} alt="Iphone" />
                  <Video autoPlay muted>
                    <source src={loan} type="video/mp4"/>
                  </Video>
                </PhoneContainer>
              </Slide>
              <Slide>
                <MobileDescription>
                  <h3>Inversion</h3>
                  <p>Alda te busca las mejores possibilidades adaptado a tu estilo de riesgo.</p>
                </MobileDescription>
                <PhoneContainer>
                  <Phone src={phone} alt="Iphone" />
                  <Video autoPlay muted>
                    <source src={investment} type="video/mp4"/>
                  </Video>
                </PhoneContainer>
              </Slide>
              <Slide>
                <MobileDescription>
                  <h3>Entendimiento</h3>
                  <p>Alda te ayuda entender y tomar control sobre tus finanzas</p>
                </MobileDescription>
                <PhoneContainer>
                  <Phone src={phone} alt="Iphone"/>
                  <Video autoPlay muted>
                    <source src={insights} type="video/mp4"/>
                  </Video>
                </PhoneContainer>
              </Slide>
            </Carousel>
          </CarouselCol>
        </Row>
      </section>
    )
  }
}

export default Features
