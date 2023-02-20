import { Composition, getInputProps } from "remotion";

import Main from "./scenes/Main";

const inputProps = getInputProps();

// type InputProps = {
//   questionType: "text-only" | "emoji";
//   questions: {
//     question: string;
//   }
// }

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
const questionData: TQuestionData[] = [
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
          questionData,
        }}
      />
    </>
  );
};
