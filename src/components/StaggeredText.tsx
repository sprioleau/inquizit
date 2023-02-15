import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  text: string;
  style?: React.CSSProperties;
  staggerByFrames?: number;
  delayByFrames?: number;
};

export default function StaggeredText({
  text,
  style,
  staggerByFrames = 2,
  delayByFrames = 0,
}: Props) {
  const words = text.split(" ");
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <>
      {words.map((word, wordIndex) => {
        const characters = word.split("");

        return (
          <>
            <span
              key={`${word}-${wordIndex}`}
              style={{ display: "inline-block" }}
            >
              {characters.map((character, characterIndex) => {
                const startFrame =
                  words.slice(0, wordIndex).join("").length +
                  characters.slice(0, characterIndex).join("").length;

                const driver = spring({
                  config: {
                    stiffness: 200,
                    mass: 0.75,
                  },
                  fps,
                  frame: frame - (startFrame * staggerByFrames + delayByFrames),
                });

                const scale = interpolate(driver, [0, 1], [0.5, 1]);
                const translateY = interpolate(driver, [0, 1], [50, 0]);

                return (
                  <span
                    key={`${word}-${wordIndex}-${characterIndex}}`}
                    data-word={word}
                    style={{
                      display: "inline-block",
                      transform: `
                        scaleY(${scale})
                        translateY(${translateY}px)
                      `,
                      transformOrigin: "bottom",
                      opacity: driver,
                      ...style,
                    }}
                  >
                    {character === " " ? <>&nbsp;</> : character}
                  </span>
                );
              })}
            </span>
            &nbsp;
          </>
        );
      })}
    </>
  );
}
