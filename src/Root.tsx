import { Composition, getInputProps } from "remotion";

import Main from "./scenes/Main";

const inputProps = getInputProps();
console.log("🚀 ~ inputProps:", inputProps);
console.log("🚀 ~ typeof inputProps:", typeof inputProps);
console.log("🚀 ~ inputProps?.questionData:", inputProps?.questionData);
console.log(
  "🚀 ~ inputProps?.questionData[0].question.text",
  inputProps?.questionData[0].question.text,
);

export type TQuestionData = {
  question: {
    text: string;
  };
  answer: {
    text: string;
    audioSrc?: string;
    startFrom?: number;
    endAt?: number;
  };
};

type TInputProps = {
  questionData: TQuestionData[];
};

// prettier-ignore
const defaultInputProps: TInputProps = {
  questionData: [
    { question: { text: "🧈☝️"   }, answer: { text: "Butterfinger"     } },
    { question: { text: "🍫🍫🍫" }, answer: { text: "Three Musketeers" } },
    { question: { text: "🐱🐱"   }, answer: { text: "KitKat"           } },
    { question: { text: "🧅💍"   }, answer: { text: "Onion Rings"      } },
    { question: { text: "🐍👂"   }, answer: { text: "Snickers"         } },
    { question: { text: "🦓🍰"   }, answer: { text: "Zebra Cake"       } },
  ],
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Main}
        durationInFrames={Number(inputProps?.duration ?? 1700)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          questionData: inputProps?.questionData ?? defaultInputProps.questionData,
        }}
      />
    </>
  );
};
