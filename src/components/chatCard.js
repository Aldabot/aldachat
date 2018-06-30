import React, { Component } from 'react'
import styled from 'styled-components'
import { Carousel, Button, Icon } from 'antd'
import PropTypes from 'prop-types'

const CardContainer = styled.div`
  border-radius: 15px
  min-height: 100%
  border: solid 1px #DDDDDD;
`
const Image = styled.img`
  width: 100%
  height: 52.63%;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
  @media (min-width: 768px) {
  height: 15vw;
  }
`
const Title = styled.h3`
  padding: 10px;
  font-size: 0.8rem;
  border-top: solid 1px #DDDDDD;
  margin-bottom: 0;
`
const SubTitle = styled.h4`
  padding: 10px;
  font-size: 0.6rem;
  border-top: solid 1px #DDDDDD;
  margin-bottom: 0;
`
const CardButton = styled(Button)`
  width: 100%;
  font-size: 1.2rem !important;
  border-radius: 0px !important;
  border-width: 0px !important;
  border-top-width: 1px !important;
  &:hover {
    border-width: 1px !important;
  }
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
        const { text, postback } = button // also contains postback!
        if (i === buttons.length-1) {
          return (
            <LastCardButton key={i}>
              <a href={postback} target="_blank">{text}</a>
            </LastCardButton>
          )
        }
        return (
          <CardButton key={i}>
            <a href={postback} target="_blank">{text}</a>
          </CardButton>
        )
      })
    }

    return (
      <CardContainer>
        <Image src={imageUri} />
        <Title>{title}</Title>
        <SubTitle hasButtons={renderedButtons.length > 0}>{subtitle}</SubTitle>
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
  componentDidMount(){
    window.addEventListener('touchstart', this.touchStart);
    window.addEventListener('touchmove', this.preventTouch, {passive: false});
  }

  componentWillUnmount(){
    window.removeEventListener('touchstart', this.touchStart);
    window.removeEventListener('touchmove', this.preventTouch, {passive: false});
  }

  touchStart(e){
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  preventTouch(e){
    const minValue = 5; // threshold

    this.clientX = e.touches[0].clientX - this.firstClientX;
    this.clientY = e.touches[0].clientY - this.firstClientY;

    // Vertical scrolling does not work when you start swiping horizontally.
    if(Math.abs(this.clientX) > minValue){ 
      e.preventDefault();
      e.returnValue = false;
      return false;
    }
  }

  render() {
    const { cards } = this.props
    let carouselSettings = {
      draggable: true,
      dots: false,
      arrows: true,
      slidesToShow: 1.1,
      slidesToScroll: 1,
      infinite: false,
      centerMode: true,
    }
    if (window.innerWidth > 768) {
      carouselSettings = {
        draggable: true,
        dots: false,
        arrows: true,
        slidesToShow: 3.5,
        slidesToScroll: 3,
        infinite: false,
        centerMode: false,
        prevArrow: <PrevArrow type="prev" />,
        nextArrow: <NextArrow type="next" />,
      }
    }


    const cardSlides = cards.map((card, index) => {
      return(
        <div key={index}>
          <ChatCard {...card} />
        </div>
      )
    })

    return (
      <Carousel {...carouselSettings}>
        {cardSlides}
      </Carousel>
    )
  }
}

export default CardCarousel;
