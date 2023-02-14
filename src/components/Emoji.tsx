// Reference: https://github.com/twitter/twemoji/issues/580#issuecomment-1375859258

import emoji from "react-easy-emoji";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  input: string;
};

const BASE_URL = "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72";

export default function Emoji({ input }: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const driver = spring({
    fps,
    frame,
    config: {
      mass: 0.5,
      stiffness: 100,
    },
  });

  const parsed = emoji(input, (code, string, offset) => {
    const driver = spring({
      fps,
      frame: frame - offset * 3,
      config: {
        mass: 0.5,
        stiffness: 100,
      },
    });

    const scale = interpolate(driver, [0, 1], [0.2, 1], {
      extrapolateRight: "clamp",
    });

    return (
      <Img
        key={offset}
        src={`${BASE_URL}/${code}.png`}
        data-emoji={string}
        alt={string}
        style={{
          width: "1em",
          height: "1em",
          transform: `scale(${scale}) rotate(${driver * 360}deg)`,
          opacity: driver,
        }}
      />
    );
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.25em",
      }}
    >
      {parsed}
    </div>
  );
}
