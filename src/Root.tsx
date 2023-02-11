import { Composition } from "remotion";

import Main from "./scenes/Main";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      {/* <Composition id="Card" component={Card} durationInFrames={150} fps={30} width={300} height={300} /> */}
      <Composition
        id="Main"
        component={Main}
        durationInFrames={705}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* <Composition id="Title" component={Title} durationInFrames={45} fps={30} width={1920} height={1080} />
			<Composition
				id="QuestionIntro"
				component={QuestionIntro}
				durationInFrames={30 * 2}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Questions"
				component={Questions}
				durationInFrames={30 * 20}
				fps={30}
				width={1920}
				height={1080}
			/> */}
    </>
  );
};
