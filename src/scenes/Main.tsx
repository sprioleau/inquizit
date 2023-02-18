import { loadFont } from "@remotion/google-fonts/Poppins";
import { useCallback, useEffect, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, Series, useVideoConfig } from "remotion";

import { getTextToSpeechData } from "../utils";
import EndScene from "./EndScene";
import QuestionIntro from "./QuestionIntro";
import Questions from "./Questions";
import Title from "./Title";

const { fontFamily } = loadFont();

export type TQuestion = {
  question: string;
  answer: string;
  audioStream: string;
};

// prettier-ignore
const passedInQuestions: TQuestion[] = [
  { question: "🧈☝️"  , answer: "Butterfinger"    , audioStream: "" },
  { question: "🍫🍫🍫", answer: "Three Musketeers", audioStream: "" },
  { question: "🐱🐱"  , answer: "KitKat"          , audioStream: "" },
  { question: "🧅💍"  , answer: "Onion Rings"     , audioStream: "" },
  { question: "🐍👂"  , answer: "Snickers"        , audioStream: "" },
  { question: "🦓🍰"  , answer: "Zebra Cake"      , audioStream: "" },
];

export default function Main() {
  const { fps } = useVideoConfig();
  const secondsPerQuestion = 8;
  const numberOfQuestions = 6;

  const [questions, setQuestions] = useState<TQuestion[]>(passedInQuestions);
  const [handle] = useState(() => delayRender());

  const getAudioData = useCallback(async () => {
    const textStrings = questions.map(({ answer }) => answer);
    const { data: textToSpeechData, error } = await getTextToSpeechData(textStrings);

    if (error || !textToSpeechData) {
      console.error(error);
      return;
    }

    const newQuestions = questions.map((question, index) => {
      return {
        ...question,
        audioStream: textToSpeechData[index],
      };
    });

    setQuestions(newQuestions);

    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    getAudioData();
  }, [getAudioData]);

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
            <Questions questions={questions} />
          </Series.Sequence>
          <Series.Sequence durationInFrames={100}>
            <EndScene />
          </Series.Sequence>
        </Series>
      </AbsoluteFill>
    </>
  );
}
