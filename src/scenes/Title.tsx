import { AbsoluteFill, Audio, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

import Logo from "../components/Logo";
import Subtitle from "../components/Subtitle";

export default function Title() {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const logoPercentage = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps: videoConfig.fps,
		frame,
	});

	const subtitlePercentage = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps: videoConfig.fps,
		frame: frame - 5,
	});

	return (
		<AbsoluteFill
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "rebeccapurple",
			}}>
			<Audio src={staticFile("chime.mp3")} />
			<div
				style={{
					transform: `scale(${logoPercentage}) translateY(${(1 - logoPercentage) * 300}px)`,
					opacity: logoPercentage,
				}}>
				<Logo />
			</div>
			<div
				style={{
					transform: `scale(${subtitlePercentage}) translateY(${(1 - subtitlePercentage) * 100}px)`,
					opacity: subtitlePercentage,
				}}>
				<Subtitle />
			</div>
		</AbsoluteFill>
	);
}
