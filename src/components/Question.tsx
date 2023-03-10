import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { TQuestionData } from "../Root";
import Emoji from "./Emoji";
import ProgressMeter from "./ProgressMeter";
import StaggeredText from "./StaggeredText";

type Props = {
  questionData: TQuestionData;
  questionNumber: number;
};

export default function Question({ questionData: { question, answer }, questionNumber }: Props) {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const staggerByFrames = 2;
  const framesToHoldAnswer = Math.max(90, answer.text.length * staggerByFrames);

  const progress = interpolate(
    frame,
    [0, durationInFrames - framesToHoldAnswer, durationInFrames],
    [0, 100, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: 250,
          lineHeight: 1,
        }}
      >
        <Emoji input={question.text} />
      </h1>
      <span
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          color: "white",
          fontSize: 80,
          fontWeight: "bold",
          lineHeight: 1,
          backgroundColor: "rebeccapurple",
          width: 150,
          height: 150,
          borderRadius: 100,
          boxShadow: `
						0 0 0 10px white,
						0 10px 30px rgba(0, 0, 0, 0.25)
					`,
        }}
      >
        {questionNumber}
      </span>
      <Sequence
        style={{
          width: "100%",
          height: "100%",
          alignContent: "center",
          justifyContent: "center",
        }}
        from={durationInFrames - framesToHoldAnswer}
      >
        <Audio
          src={answer.audioSrc}
          startFrom={answer.startFrom}
          endAt={answer.endAt}
        />
        <p
          style={{
            position: "absolute",
            top: 100,
            margin: 0,
            color: "white",
            fontSize: 120,
            lineHeight: 1,
          }}
        >
          <StaggeredText
            text={answer.text}
            staggerByFrames={staggerByFrames}
          />
        </p>
      </Sequence>
      <ProgressMeter
        progress={progress}
        shouldCountDown
      />
    </AbsoluteFill>
  );
}
