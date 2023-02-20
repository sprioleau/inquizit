import { TQuestionData } from "../Root";
import convertMsToFrames from "./convertMsToFrames";
import getAudioSource from "./getAudioSource";

type TArgs = {
  questionData: TQuestionData[];
  framesPerSecond: number;
  onFinish?: (data: TQuestionData[]) => void;
};

export default async function getQuestionsWithAudioData({
  questionData,
  framesPerSecond,
  onFinish,
}: TArgs) {
  const textStrings = questionData.map(({ answer }) => answer.text);
  const url = `https://sp-serverless-tts.vercel.app/api/tts?text=${textStrings.join(".")}`;

  // prettier-ignore
  let data = null,
      error = null;

  try {
    const response = await fetch(url);
    const { error, words, audioStream: audioStreamFromApi } = await response.json();

    if (error) throw new Error(error);

    const newQuestions = questionData.map((question, index) => ({
      ...question,
      answer: {
        ...question.answer,
        audioSrc: getAudioSource(audioStreamFromApi),
        startFrom: convertMsToFrames(words[index].startTime, framesPerSecond),
        endAt: convertMsToFrames(words[index].endTime, framesPerSecond),
      },
    }));

    data = newQuestions;
  } catch (caughtError) {
    error = caughtError;
  }

  if (data && onFinish) return onFinish(data);

  return { data, error };
}
