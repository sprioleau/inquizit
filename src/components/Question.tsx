import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import ProgressMeter from "./ProgressMeter";

type Props = {
	question: string;
	questionNumber: number;
	answer: string;
};

export default function Question({ question, questionNumber, answer }: Props) {
	const { fps, durationInFrames } = useVideoConfig();
	const frame = useCurrentFrame();

	const progress = interpolate(frame, [0, durationInFrames - 60, durationInFrames], [0, 100, 100], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const percentage = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps,
		frame,
	});

	const scale = interpolate(percentage, [0, 20, durationInFrames - 20, durationInFrames], [150, 0, 0, -50], {
		easing: Easing.inOut(Easing.ease),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const answerOpacity = interpolate(
		frame,
		[0, durationInFrames - 60, durationInFrames - 30, durationInFrames],
		[0, 0, 1, 0],
		{
			easing: Easing.inOut(Easing.ease),
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		}
	);

	return (
		<AbsoluteFill
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<h1
				style={{
					color: "white",
					fontSize: 250,
					lineHeight: 1,
				}}>
				{question}
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
					color: "black",
					fontSize: 80,
					lineHeight: 1,
					backgroundColor: "gold",
					width: 150,
					height: 150,
					borderRadius: 100,
				}}>
				{questionNumber}
			</span>
			<p
				style={{
					position: "absolute",
					top: 100,
					margin: 0,
					color: "white",
					fontSize: 120,
					lineHeight: 1,
					opacity: answerOpacity,
				}}>
				{answer}
			</p>
			<ProgressMeter progress={progress} shouldCountDown />
		</AbsoluteFill>
	);
}
