export function getTracks() {
  return fetch(
    'https://my-json-server.typicode.com/migueljo/sound-player-service/tracks',
  ).then(res => res.json())
}
