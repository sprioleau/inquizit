import { Composition, getInputProps } from "remotion";

import Main from "./scenes/Main";

const inputProps = getInputProps();

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
      />
    </>
  );
};
