import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react'
import { PropTypes } from 'prop-types'
import { toDuration } from 'Utils'
import * as Styles from './SoundPlayerStyles'

function ProgressBar({
  currentTime,
  trackDuration,
  updateTrackTime,
}) {
  const [showDurationInPoint, setShowDurationInPoint] = useState(
    false,
  )
  const [durationInPoint, setDurationInPoint] = useState({
    raw: 0,
    formatted: 0,
    point: 0,
  })
  const rect = useRef(null)
  const progressBarRef = useRef(null)
  const progress =
    currentTime && trackDuration
      ? (currentTime / trackDuration) * 100
      : 0
  const handleMouseEnter = useCallback(() => {
    setShowDurationInPoint(true)
  }, [])
  const handleMouseLeave = useCallback(() => {
    setShowDurationInPoint(false)
  }, [])
  const handleMouseMove = useCallback(
    e => {
      const point = e.clientX - rect.current.left
      const percentege = (point / rect.current.width) * 100
      const newDurationInPoint = Math.round(
        (percentege * trackDuration) / 100,
      )
      setDurationInPoint({
        raw: newDurationInPoint,
        formatted: toDuration(newDurationInPoint),
        point,
      })
    },
    [trackDuration],
  )
  const handleClick = useCallback(() => {
    updateTrackTime(durationInPoint)
  }, [durationInPoint, updateTrackTime])

  useEffect(() => {
    rect.current = progressBarRef.current.getBoundingClientRect()
  }, [])

  return (
    <Styles.ProgressBarContainer>
      <Styles.ProgressBarDurationInPoint
        point={durationInPoint.point}
        show={showDurationInPoint}
      >
        {durationInPoint.formatted}
      </Styles.ProgressBarDurationInPoint>
      <Styles.ProgressBar
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={progressBarRef}
        progress={progress}
        onClick={handleClick}
      />
    </Styles.ProgressBarContainer>
  )
}

ProgressBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  trackDuration: PropTypes.number.isRequired,
  updateTrackTime: PropTypes.func.isRequired,
}

export default ProgressBar
