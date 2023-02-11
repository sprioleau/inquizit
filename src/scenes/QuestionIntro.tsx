import {
	AbsoluteFill,
	Audio,
	Easing,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

export default function QuestionIntro() {
	const { fps, durationInFrames } = useVideoConfig();
	const frame = useCurrentFrame();

	const driver = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps,
		frame,
	});

	const translateY = interpolate(frame, [0, 20, durationInFrames - 30, durationInFrames], [150, 0, 0, 30], {
		easing: Easing.inOut(Easing.ease),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const opacity = interpolate(frame, [0, 20, durationInFrames - 30, durationInFrames - 10], [0, 1, 1, 0], {
		easing: Easing.inOut(Easing.ease),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const scale = interpolate(driver, [0, 20, durationInFrames - 30, durationInFrames - 10], [0, 100, 100, 0], {
		easing: Easing.inOut(Easing.ease),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "rebeccapurple",
			}}>
			<Audio src={staticFile("question.mp3")} startFrom={5} />
			<div
				style={{
					transform: `scale(${scale}) translateY(${translateY}px)`,
					opacity,
				}}>
				<h1
					style={{
						textTransform: "uppercase",
						color: "white",
						fontSize: 150,
						fontWeight: 900,
						lineHeight: 1.1,
						textAlign: "center",
						padding: 20,
					}}>
					Guess the <span style={{ color: "gold" }}>snack</span> <br /> by emoji
				</h1>
			</div>
		</AbsoluteFill>
	);
}
