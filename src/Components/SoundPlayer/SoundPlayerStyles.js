import styled, { keyframes, css } from 'styled-components'

export const Container = styled.div`
  box-shadow: 0 30px 80px #656565;
  width: 100%;
  height: 100px;
  position: relative;
`

export const Wrapper = styled.div`
  height: 100%;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  position: relative;
  background-color: white;
  border-radius: 4px;
`

export const Cover = styled.div`
  position: absolute;
  left: 30px;
  z-index: 1;
  background-color: #003f63;
  top: -40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: ${props =>
    props.playing ? '4px solid white' : '10px solid white'};
  transform: ${props =>
    props.playing ? 'translateY(-20px)' : 'translateY(0)'};
  transition: transform 400ms, border 400ms;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: lightgray;
    border: 2px solid white;
    border-radius: 50%;
  }
`

const CoverAnimation = keyframes`
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
`

function getCoverAnimation(playing) {
  if (playing) {
    return css`
      animation: 3s ${CoverAnimation} infinite linear;
    `
  }
  return ''
}

export const Image = styled.img`
  width: 100%;
  border-radius: 50%;
  filter: ${props => (props.loading ? 'blur(1px);' : 'blur(0)')};
  ${props => getCoverAnimation(props.playing)}
`

export const Loader = styled.div`
  display: ${props => (props.loading ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: 100;
  font-size: 12px;
`

export const Controls = styled.div`
  height: 100%;
`

export const Button = styled.button`
  border: none;
  width: 85px;
  height: 100%;
  margin-right: 5px;
  transition: background-color 300ms;
  cursor: pointer;
  border-radius: 4px;

  &:last-child {
    margin-right: 0;
  }

  & svg {
    fill: #003f63;
  }

  &:hover {
    background-color: #04a1fb;

    & svg {
      fill: white;
    }
  }
`

export const Info = styled.div`
  position: absolute;
  width: calc(100% - 20px);
  top: 0;
  left: 10px;
  background-color: #003f63;
  transform: ${props =>
    props.show ? 'translateY(-95px)' : 'translateY(0)'};
  border-radius: 4px 4px 0 0;
  padding: 15px 22px 15px 180px;
  transition: transform 300ms;
  text-align: left;
`

export const Author = styled.p`
  color: #04a1fb;
  font-weight: bold;
  margin: 0;
`

export const Name = styled.p`
  color: #acaebd;
  margin: 2px 0 13px;
  font-size: 13px;
`

export const DurationInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Duration = styled.p`
  font-size: 11px;
  color: #04a1fb;
  margin: 0;
`

export const ProgressBarContainer = styled.div`
  position: relative;
`

export const ProgressBarDurationInPoint = styled.p`
  position: absolute;
  top: -40px;
  left: 0;
  transform: ${props => `translateX(calc(${props.point}px - 18px))`};
  font-size: 12px;
  background-color: #212121;
  color: white;
  border-radius: 4px;
  padding: 5px;
  display: ${props => (props.show ? 'block' : 'none')};
`

export const ProgressBar = styled.div`
  border-radius: 4px;
  height: 4px;
  background-color: #acaebd;
  position: relative;
  outline: 0;
  width: 100%;
  border: none;
  margin-top: 3px;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => `${props.progress}%`};
    height: 100%;
    background-color: #04a1fb;
    border-radius: 4px;
    transition: width 300ms; // TODO: use transform instead of width to move the bar
  }
`
