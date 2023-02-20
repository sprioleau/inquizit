import { loadFont } from "@remotion/google-fonts/Poppins";
import { useEffect, useState } from "react";
import { AbsoluteFill, delayRender, Series, useVideoConfig } from "remotion";

import { TQuestionData } from "../Root";
import { getQuestionsWithAudioData } from "../utils";
import EndScene from "./EndScene";
import QuestionIntro from "./QuestionIntro";
import Questions from "./Questions";
import Title from "./Title";

const { fontFamily } = loadFont();

type Props = {
  questionData: TQuestionData[];
};

export default function Main({ questionData: passedInQuestionData }: Props) {
  const { fps } = useVideoConfig();
  const secondsPerQuestion = 8;
  const numberOfQuestions = 6;

  const [questionData, setQuestionData] = useState<TQuestionData[]>(passedInQuestionData);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    getQuestionsWithAudioData({
      questionData,
      framesPerSecond: fps,
      onFinish: setQuestionData,
    });
  }, [handle]);

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
            <Questions questionData={questionData} />
          </Series.Sequence>
          <Series.Sequence durationInFrames={100}>
            <EndScene />
          </Series.Sequence>
        </Series>
      </AbsoluteFill>
    </>
  );
}
