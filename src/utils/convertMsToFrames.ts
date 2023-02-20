export default function convertMsToFrames(milliseconds: number, framesPerSecond: number) {
  return Math.round((milliseconds / 1000) * framesPerSecond);
}
