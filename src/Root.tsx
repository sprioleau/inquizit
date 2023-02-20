import { Composition, getInputProps } from "remotion";

import Main from "./scenes/Main";

const inputProps = getInputProps();
console.log("🚀 ~ inputProps?.questionData:", inputProps?.questionData);

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

// prettier-ignore
const defaultInputProps: TQuestionData[] = [
  { question: { text: "🧈☝️"   }, answer: { text: "Butterfinger"     } },
  { question: { text: "🍫🍫🍫" }, answer: { text: "Three Musketeers" } },
  { question: { text: "🐱🐱"   }, answer: { text: "KitKat"           } },
  { question: { text: "🧅💍"   }, answer: { text: "Onion Rings"      } },
  { question: { text: "🐍👂"   }, answer: { text: "Snickers"         } },
  { question: { text: "🦓🍰"   }, answer: { text: "Zebra Cake"       } },
];

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
          questionData: JSON.parse(inputProps.questionData) ?? defaultInputProps,
        }}
      />
    </>
  );
};
