import { loadFont } from "@remotion/google-fonts/Poppins";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";

import QuestionIntro from "./QuestionIntro";
import Questions from "./Questions";
import Title from "./Title";

const { fontFamily } = loadFont();

export default function Main() {
  const { fps } = useVideoConfig();
  const secondsPerQuestion = 8;
  const numberOfQuestions = 6;

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <Sequence
        from={0}
        durationInFrames={45}
      >
        <Title />
      </Sequence>
      <Sequence
        from={45}
        durationInFrames={30 * 2}
      >
        <QuestionIntro />
      </Sequence>
      <Sequence
        from={45 + 30 * 2}
        durationInFrames={fps * secondsPerQuestion * numberOfQuestions}
      >
        <Questions />
      </Sequence>
    </AbsoluteFill>
  );
}
