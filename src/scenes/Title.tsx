import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";

import Logo from "../components/Logo";
import TitleBackground from "../components/TitleBackground";

export default function Title() {
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
      <Audio src={staticFile("chime.mp3")} />
      <TitleBackground />
      <Logo />
      <p
        style={{
          zIndex: 1,
          fontSize: 60,
          color: "white",
          margin: 0,
          opacity: interpolate(frame, [0, 15, 30], [0, 0, 1]),
        }}
      >
        inquire into
      </p>
    </AbsoluteFill>
  );
}
