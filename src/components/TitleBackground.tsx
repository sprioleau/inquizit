import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  color?: string;
};

const CIRCLE_QUANTITY = 6;
const STAGGER_OFFSET = 3;

export default function TitleBackground({ color = "#3B075E" }: Props) {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const diagonal = Math.sqrt(height ** 2 + width ** 2);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        background: color,
        opacity: 0.5,
      }}
    >
      {Array.from({ length: CIRCLE_QUANTITY }).map((_, index) => {
        const size = (CIRCLE_QUANTITY - index) * (1 / CIRCLE_QUANTITY) * diagonal;
        const driver = spring({
          config: { mass: 0.5 },
          fps,
          frame: frame - index * STAGGER_OFFSET + 5,
        });
        const scale = interpolate(driver, [0, 1], [1.5, 0.9]);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: diagonal / 2,
              opacity: 0.6,
              mixBlendMode: "screen",
              transform: `scale(${scale})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
}
