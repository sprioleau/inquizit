import { AbsoluteFill, Audio, staticFile } from "remotion";

import StaggeredText from "../components/StaggeredText";

export default function QuestionIntro() {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rebeccapurple",
      }}
    >
      <Audio
        src={staticFile("question.mp3")}
        startFrom={5}
      />
      <h1
        style={{
          textTransform: "uppercase",
          color: "white",
          fontSize: 150,
          fontWeight: 700,
          lineHeight: 1.1,
          textAlign: "center",
          padding: 100,
          maxWidth: "90%",
        }}
      >
        <StaggeredText
          text="Guess the snack by emoji"
          staggerByFrames={1}
        />
      </h1>
    </AbsoluteFill>
  );
}
