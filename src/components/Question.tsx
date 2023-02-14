import { useCallback, useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { getTextToSpeechData } from "../utils";
import Emoji from "./Emoji";
import ProgressMeter from "./ProgressMeter";
import StaggeredText from "./StaggeredText";

type Props = {
  question: string;
  questionNumber: number;
  answer: string;
};

export default function Question({ question, questionNumber, answer }: Props) {
  const [data, setData] = useState<null | { audioStream: string }>(null);
  const [handle] = useState(() => delayRender());

  const fetchData = useCallback(async () => {
    const { data: dataFromApi, error } = await getTextToSpeechData(answer);
    if (dataFromApi) setData(dataFromApi);
    if (error) console.error(error);

    continueRender(handle);
  }, [handle]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const staggerByFrames = 2;
  const framesToHoldAnswer = Math.max(90, answer.length * staggerByFrames);

  const progress = interpolate(
    frame,
    [0, durationInFrames - framesToHoldAnswer, durationInFrames],
    [0, 100, 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  if (!data) return null;

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
        <Emoji input={question} />
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
        {data && data?.audioStream && <Audio src={"data:audio/mp3;base64," + data.audioStream} />}
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
            text={answer}
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
