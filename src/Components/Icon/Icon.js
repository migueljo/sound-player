import React from 'react'
import PropTypes from 'prop-types'

function Previous() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path d="M18 5v10l10-10v22l-10-10v10l-11-11z" />
    </svg>
  )
}

function Next() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path d="M16 27v-10l-10 10v-22l10 10v-10l11 11z" />
    </svg>
  )
}

function Play() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path d="M6 4l20 12-20 12z" />
    </svg>
  )
}

function Pause() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path d="M4 4h10v24h-10zM18 4h10v24h-10z" />
    </svg>
  )
}

const icons = {
  previous: Previous,
  next: Next,
  play: Play,
  pause: Pause,
}

function Icon({ name, ...props }) {
  const Component = icons[name]
  if (!Component) return null
  return <Component {...props} />
}

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(icons)).isRequired,
}

export default Icon
