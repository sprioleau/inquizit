import { loadFont } from "@remotion/google-fonts/Poppins";
import { AbsoluteFill, Series, useVideoConfig } from "remotion";

import EndScene from "./EndScene";
import QuestionIntro from "./QuestionIntro";
import Questions from "./Questions";
import Title from "./Title";

const { fontFamily } = loadFont();

export default function Main() {
  const { fps } = useVideoConfig();
  const secondsPerQuestion = 8;
  const numberOfQuestions = 6;

  return (
    <>
      <AbsoluteFill style={{ fontFamily }}>
        <Series>
          <Series.Sequence durationInFrames={75}>
            <Title />
          </Series.Sequence>
          <Series.Sequence durationInFrames={30 * 3}>
            <QuestionIntro />
          </Series.Sequence>
          <Series.Sequence durationInFrames={fps * secondsPerQuestion * numberOfQuestions}>
            <Questions />
          </Series.Sequence>
          <Series.Sequence durationInFrames={100}>
            <EndScene />
          </Series.Sequence>
        </Series>
      </AbsoluteFill>
    </>
  );
}
