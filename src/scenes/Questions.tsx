import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";

import Question from "../components/Question";
import ScrollingBackgroundWave from "../components/ScrollingBackgroundWave";
import { TQuestionData } from "../Root";

type Props = {
  questionData: TQuestionData[];
};

export default function Questions({ questionData }: Props) {
  const { durationInFrames } = useVideoConfig();

  const framesPerQuestion = Math.floor(durationInFrames / questionData.length);

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
      {questionData.map((singleQuestionData, index) => (
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
            questionData={singleQuestionData}
            questionNumber={index + 1}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
