import { loadFont } from "@remotion/google-fonts/Poppins";
import { AbsoluteFill, Sequence } from "remotion";

import QuestionIntro from "./QuestionIntro";
import Questions from "./Questions";
import Title from "./Title";

const { fontFamily } = loadFont();

export default function Main() {
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
        durationInFrames={30 * 20}
      >
        <Questions />
      </Sequence>
    </AbsoluteFill>
  );
}
