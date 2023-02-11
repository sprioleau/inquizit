import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";

import Question from "../components/Question";

const questions = [
	{
		question: "🧈☝️",
		answer: "Butterfinger",
	},
	{
		question: "🍫🍫🍫",
		answer: "Three Musketeers",
	},
	{
		question: "🐱🐱",
		answer: "KitKat",
	},
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
				background: "rebeccapurple",
			}}>
			<Audio src={staticFile("background.mp3")} startFrom={345} volume={0.5} />
			{questions.map(({ question, answer }, index) => (
				<Sequence key={index} from={framesPerQuestion * index} durationInFrames={framesPerQuestion}>
					<Question question={question} questionNumber={index + 1} answer={answer} />
				</Sequence>
			))}
		</AbsoluteFill>
	);
}
