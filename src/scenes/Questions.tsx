import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";

import Question from "../components/Question";
import ScrollingBackgroundWave from "../components/ScrollingBackgroundWave";

// prettier-ignore
const questions = [
  { question: "🧈☝️"   , answer: "Butterfinger"     },
  { question: "🍫🍫🍫" , answer: "Three Musketeers" },
  { question: "🐱🐱"   , answer: "KitKat"           },
  { question: "🧅💍"   , answer: "Onion Rings"      },
  { question: "🐍👂"   , answer: "Snickers"         },
  { question: "🦓🍰"   , answer: "Zebra Cake"       },
];

export default function QuestionIntro() {
  const { durationInFrames } = useVideoConfig();

  const framesPerQuestion = Math.floor(durationInFrames / questions.length);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Audio
        src={staticFile("background.mp3")}
        startFrom={345}
        volume={0.5}
      />
      {questions.map(({ question, answer }, index) => (
        <Sequence
          key={index}
          from={framesPerQuestion * index}
          durationInFrames={framesPerQuestion}
        >
          <ScrollingBackgroundWave
            color={["#E21D6F", "#288ED7", "#188181", "#E4AD1F", "#a819ea"][index % 5]}
            speedIncrement={0.01}
          />
          <Question
            question={question}
            questionNumber={index + 1}
            answer={answer}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
