// Reference: https://github.com/twitter/twemoji/issues/580#issuecomment-1375859258

import emoji from "react-easy-emoji";
import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  input: string;
};

const BASE_URL = "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg";

export default function Emoji({ input }: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wobbleSpeed = 0.15;

  const parsed = emoji(input, (code, string, offset) => {
    const defaultDriver = spring({
      fps,
      frame: 0.5 * frame - offset * 2,
      config: {
        mass: 0.1,
      },
    });

    const scale = interpolate(defaultDriver, [0, 1], [0.2, 1], {
      extrapolateRight: "clamp",
    });

    const rotate = interpolate(
      defaultDriver + (Math.sin((frame - offset) * wobbleSpeed) % 10),
      [0, 2],
      [-5, 5],
      {
        extrapolateRight: "clamp",
      },
    );

    return (
      <Img
        key={offset}
        src={`${BASE_URL}/${code}.svg`}
        data-emoji={string}
        alt={string}
        style={{
          display: "inline-block",
          width: "1em",
          height: "1em",
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          transformOrigin: "center center",
          opacity: defaultDriver,
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
