import React, { Component } from 'react'
import styled from 'styled-components'
import { Carousel, Row, Col, Button, Icon } from 'antd'
import PropTypes from 'prop-types'

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
  height: 40vw;
  object-fit: cover;
  border-radius: 20px;
  @media (min-width: 768px) {
    height: 15vw;
  }
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
    const { title, subtitle, imageUri, buttons } = this.props

    let renderedButtons = []
    if(buttons) {
      renderedButtons = buttons.map((button, i) => {
        const { text } = button // also contains postback!
        if (i === buttons.length-1) {
          return <LastCardButton key={i}>{text}</LastCardButton>
        }
        return <CardButton key={i}>{text}</CardButton>
      })
    }

    return (
      <CardContainer>
        <Image src={imageUri} />
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
        {renderedButtons}
      </CardContainer>
    )
  }
}
ChatCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imageUri: PropTypes.string.isRequired,
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
  width: 9vw !important;
  height: 9vw !important;
  color: black !important;
  line-height: 9vw !important;
  text-align: center !important;
  left: 0 !important;
  border-color: #DDDDDD !important;
  border-style: solid !important;
  border-width: 1px !important;
  border-radius: 0 5px 5px 0 !important;
  z-index: 10;
  @media (min-width: 768px) {
    width: 3vw !important;
    height: 3vw !important;
    line-height: 3vw !important;
  }
`
const NextArrow = PrevArrow.extend`
  left: auto !important;
  right: 0 !important;
  border-radius: 5px 0 0 5px !important;
`




class CardCarousel extends Component {
  render() {
    const { cards } = this.props

    const carouselSettings = {
      draggable: true,
      dots: false,
      arrows: true,
      prevArrow: <PrevArrow type="prev" />,
      nextArrow: <NextArrow type="next" />,
    }

    const cardSlides = cards.map((card, index) => {
      return(
        <div key={index}>
          <ChatCard {...card} />
        </div>
      )
    })

    return (
      <Row>
        <Col span={24} md={21}>
          <Carousel {...carouselSettings}>
            {cardSlides}
          </Carousel>
        </Col>
      </Row>
    )
  }
}

export default CardCarousel;
