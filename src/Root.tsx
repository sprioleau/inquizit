import { Composition, getInputProps } from "remotion";

import ScrollingBackground from "./components/ScrollingBackground";
import ScrollingBackgroundWave from "./components/ScrollingBackgroundWave";
import Main from "./scenes/Main";

const inputProps = getInputProps();

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Main}
        durationInFrames={Number(inputProps?.duration ?? 1545)}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ScrollingBackgroundWave"
        component={ScrollingBackgroundWave}
        durationInFrames={60}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ScrollingBackground"
        component={ScrollingBackground}
        durationInFrames={60}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          imageSource: "images/waves-2.svg",
        }}
      />
    </>
  );
};
