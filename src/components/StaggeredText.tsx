import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  text: string;
  style?: React.CSSProperties;
  staggerByFrames?: number;
};

export default function StaggeredText({ text, style, staggerByFrames = 2 }: Props) {
  const characters = text.split("");
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <>
      {characters.map((character, index) => {
        const progress = spring({
          config: {
            stiffness: 200,
            mass: 0.75,
          },
          fps,
          frame: frame - index * staggerByFrames,
        });

        const scale = interpolate(progress, [0, 1], [0.5, 1]);
        const translateY = interpolate(progress, [0, 1], [50, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              transform: `
                scaleY(${scale})
                translateY(${translateY}px)
              `,
              transformOrigin: "bottom",
              opacity: progress,
              ...style,
            }}
          >
            {character === " " ? <>&nbsp;</> : character}
          </span>
        );
      })}
    </>
  );
}
