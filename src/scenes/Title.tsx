import { AbsoluteFill, Audio, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

import Logo from "../components/Logo";

export default function Title() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    config: {
      stiffness: 200,
      mass: 0.75,
    },
    fps,
    frame: 0.5 * (frame - 15),
  });

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
      <Logo />
      <p
        style={{
          fontSize: 60,
          color: "white",
          margin: 0,
          opacity,
        }}
      >
        inquire into
      </p>
    </AbsoluteFill>
  );
}
