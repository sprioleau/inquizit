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
        durationInFrames={90}
      >
        <Title />
      </Sequence>
      <Sequence
        from={90}
        durationInFrames={30 * 3}
      >
        <QuestionIntro />
      </Sequence>
      <Sequence
        from={90 + 30 * 3}
        durationInFrames={fps * secondsPerQuestion * numberOfQuestions}
      >
        <Questions />
      </Sequence>
    </AbsoluteFill>
  );
}
