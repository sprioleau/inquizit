export default function getAudioSource(base64: string) {
  return `data:audio/mp3;base64,${base64}`;
}
