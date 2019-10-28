import React, { useState, useRef, useCallback } from 'react'
import { PropTypes } from 'prop-types'
import Icon from 'Components/Icon'
import { toDuration } from 'Utils'
import ProgressBar from './ProgressBar'
import * as Styles from './SoundPlayerStyles'

function SoundPlayer({ tracks }) {
  const [loading, setLoading] = useState(false)
  const [userPlayedTrack, setUserPlayedTrack] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [actualTrackIndex, setActualTrackIndex] = useState(0)
  const actualTrack = tracks[actualTrackIndex]
  const [currentTime, setCurrentTime] = useState({
    formatted: 0,
    raw: 0,
  })
  const [totalDuration, setTotalDuration] = useState({
    formatted: 0,
    raw: 0,
  })
  const audioElm = useRef(null)
  const handlePrevious = useCallback(() => {
    const newTrackIndex =
      actualTrackIndex === 0
        ? tracks.length - 1
        : actualTrackIndex - 1

    setActualTrackIndex(newTrackIndex)
    setAutoPlay(true)
  }, [actualTrackIndex, tracks])

  const handleNext = useCallback(() => {
    const newTrackIndex =
      actualTrackIndex === tracks.length - 1
        ? 0
        : actualTrackIndex + 1

    setActualTrackIndex(newTrackIndex)
    setAutoPlay(true)
  }, [tracks.length, actualTrackIndex])

  const handlePlayPauseProxy = useCallback(() => {
    setUserPlayedTrack(true)
    if (loading) return

    if (audioElm.current.paused) {
      audioElm.current.play()
    } else {
      audioElm.current.pause()
    }
  }, [loading])

  const updateTrackTime = useCallback(newTime => {
    const time = newTime.raw
    setCurrentTime({
      raw: time,
      formatted: newTime.formatted,
    })
    audioElm.current.currentTime = time
  }, [])

  const handleCanPlay = useCallback(() => {
    const rawDuration = audioElm.current.duration
    const duration = toDuration(rawDuration)
    setTotalDuration({ raw: rawDuration, formatted: duration })
    setLoading(false)
    if (autoPlay) {
      audioElm.current.play()
      setAutoPlay(false)
    }
  }, [autoPlay])

  const handlePlaying = useCallback(() => {
    setPlaying(true)
  }, [])

  const handlePause = useCallback(() => {
    setPlaying(false)
  }, [])

  const handleTimeUpdate = useCallback(() => {
    const rawCurrentTime = audioElm.current.currentTime
    const newCurrentTime = toDuration(rawCurrentTime)
    setCurrentTime({ raw: rawCurrentTime, formatted: newCurrentTime })
  }, [])

  const handleWaiting = useCallback(() => {
    setLoading(true)
  }, [])

  const handleEnded = useCallback(() => {
    handleNext()
  }, [handleNext])

  return (
    <Styles.Container>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        src={actualTrack.track}
        ref={audioElm}
        onCanPlay={handleCanPlay}
        onPlaying={handlePlaying}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onWaiting={handleWaiting}
        onLoadStart={handleWaiting}
        onEnded={handleEnded}
      />
      <Styles.Wrapper>
        <div>
          <Styles.Cover playing={playing}>
            <Styles.Image
              src={actualTrack.art_work}
              playing={playing}
              loading={loading ? 1 : 0}
            />
            <Styles.Loader loading={loading ? 1 : 0}>
              loading...
            </Styles.Loader>
          </Styles.Cover>
        </div>
        <Styles.Controls>
          <Styles.Button onClick={handlePrevious}>
            <Icon name="previous" />
          </Styles.Button>
          <Styles.Button onClick={handlePlayPauseProxy}>
            <Icon name={playing ? 'pause' : 'play'} />
          </Styles.Button>
          <Styles.Button onClick={handleNext}>
            <Icon name="next" />
          </Styles.Button>
        </Styles.Controls>
      </Styles.Wrapper>
      <Styles.Info show={playing || (loading && userPlayedTrack)}>
        <Styles.Author>{actualTrack.album}</Styles.Author>
        <Styles.Name>{actualTrack.name}</Styles.Name>
        <Styles.DurationInfo>
          <Styles.Duration>{currentTime.formatted}</Styles.Duration>
          <Styles.Duration>{totalDuration.formatted}</Styles.Duration>
        </Styles.DurationInfo>
        <ProgressBar
          currentTime={currentTime.raw}
          trackDuration={totalDuration.raw}
          updateTrackTime={updateTrackTime}
        />
      </Styles.Info>
    </Styles.Container>
  )
}

SoundPlayer.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      album: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      art_work: PropTypes.string.isRequired,
      track: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default SoundPlayer
