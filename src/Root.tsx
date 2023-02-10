import { Composition } from "remotion";
import { Logo } from "./HelloWorld/Logo";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	return (
		<>
			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
			<Composition id="OnlyLogo" component={Logo} durationInFrames={150} fps={30} width={1920} height={1080} />
		</>
	);
};
