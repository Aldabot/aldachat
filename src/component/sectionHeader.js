import styled from 'styled-components'

export const SectionHeader = styled.h1`
  text-align: center;
  font-size: 40px;
  position: relative;
  padding: 20px;
  margin-bottom: 40px;
  &:after {
    content: "";
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 2px;
    position: absolute;
    background: linear-gradient(to right, #FFB3AA, #FFD0AA)
  }
`
