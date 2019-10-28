import React, { useState, useEffect } from 'react'
import SoundPlayer from 'Components/SoundPlayer'
import { getTracks } from 'Utils/API'
import * as Styles from './TracksStyles'

function useGetTracks() {
  const [tracks, setTracks] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTracks().then(_tracks => {
      setTracks(_tracks)
      setLoading(false)
    })
  }, [])

  return { loading, tracks }
}

function Tracks() {
  const { tracks, loading } = useGetTracks()

  return (
    <Styles.PlayerContainer>
      {loading ? 'loading...' : <SoundPlayer tracks={tracks} />}
    </Styles.PlayerContainer>
  )
}

export default Tracks
