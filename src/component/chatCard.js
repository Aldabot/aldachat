import React, { Component } from 'react'
import image from '../media/diamond.svg'
import styled from 'styled-components'
import { Carousel, Row, Col, Button, Icon } from 'antd'

const CardContainer = styled.div`
  border: solid 1px;
  border-color: #DDDDDD;
  border-radius: 15px;
  width: 100%;
`
const Title = styled.h3`
  margin: 1vw;
  font-size: 1.5rem;
`
const SubTitle = styled.h4`
  margin: 1vw;
  font-size: 1.2rem;
`
const Image = styled.img`
  width: 100%
  height: 15vw;
  object-fit: cover;
`
const CardButton = styled(Button)`
width: 100%;
font-size: 1.2rem !important;
  border-radius: 0px !important;
  border-right-width: 0 !important;
  border-left-width: 0 !important;
  border-bottom-width: 0 !important;
`
const LastCardButton = CardButton.extend`
  border-radius: 0 0 15px 15px !important;
`

class ChatCard extends Component {
  render() {
    return (
      <CardContainer>
        <Image src={image} />
        <Title>Title</Title>
        <SubTitle>SubTitle</SubTitle>
        <CardButton>Test</CardButton>
        <LastCardButton>Test</LastCardButton>
      </CardContainer>
    )
  }
}

class Arrow extends Component {
  render() {
    const { className, style, onClick, type } = this.props;
    return (
      <div
        className={className}
        style={{ ...style }}
        onClick={onClick}
      >
        {type === 'next' && (
           <Icon type="arrow-right" />
        )}
        {type === 'prev' && (
           <Icon type="arrow-left" />
        )}
      </div>
    );
  }
}
const PrevArrow = styled(Arrow)`
  font-size: 1.7rem !important;
  display: block !important;
  background: #f1f0f0 !important;
  width: 3vw !important;
  height: 3vw !important;
  color: black !important;
  line-height: 3vw !important;
  text-align: center !important;
  left: 0 !important;
  border-color: #DDDDDD !important;
  border-style: solid !important;
  border-width: 1px !important;
  border-radius: 0 5px 5px 0 !important;
  z-index: 10;
`
const NextArrow = PrevArrow.extend`
  left: auto !important;
  right: 0 !important;
  border-radius: 5px 0 0 5px !important;
`




class CardCarousel extends Component {
  render() {
    const carouselSettings = {
      draggable: true,
      dots: false,
      arrows: true,
      prevArrow: <PrevArrow type="prev" />,
      nextArrow: <NextArrow type="next" />,
    }

    return (
      <Row>
        <Col span={21}>
          <Carousel {...carouselSettings}>
            <div><ChatCard /></div>
            <div><ChatCard /></div>
          </Carousel>
        </Col>
      </Row>
    )
  }
}

export default CardCarousel;
