export function toDuration(time) {
  const roundedTime = Math.round(time)
  const minutes = (() => {
    const roundedMinutes = Math.floor(roundedTime / 60)
    return roundedMinutes < 10 ? `0${roundedMinutes}` : roundedMinutes
  })()
  const seconds = (() => {
    const s = roundedTime % 60
    return s < 10 ? `0${s}` : s
  })()

  return `${minutes}:${seconds}`
}
