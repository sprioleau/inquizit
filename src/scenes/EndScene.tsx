import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";

import StaggeredText from "../components/StaggeredText";
import TitleBackground from "../components/TitleBackground";

export default function EndScene() {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rebeccapurple",
      }}
    >
      <Audio src={staticFile("credits-chime.mp3")} />
      <TitleBackground
        color="#5e0744"
        waveDirection="out"
      />
      <h1
        style={{
          fontSize: 150,
          margin: 0,
          lineHeight: 1.1,
          color: "white",
        }}
      >
        <StaggeredText text="Subscribe" />
      </h1>
      <p
        style={{
          zIndex: 1,
          fontSize: 80,
          textAlign: "center",
          lineHeight: 1,
          color: "white",
          margin: 0,
          opacity: interpolate(frame, [0, 15, 30], [0, 0, 1]),
        }}
      >
        for more videos
      </p>
    </AbsoluteFill>
  );
}
