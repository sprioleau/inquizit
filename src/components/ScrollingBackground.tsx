import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  imageSource?: string;
};

export default function ScrollingBackground({ imageSource }: Props) {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const scrollSpeed = 0.25;

  const translateXPercentage = interpolate(frame, [0, durationInFrames], [0, 0.5 * scrollSpeed], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Img
        src={staticFile(imageSource ?? "images/waves-1.svg")}
        style={{
          height: "100%",
          width: "200%",
          objectFit: "cover",
          transform: `translateX(-${translateXPercentage * 100}%)`,
        }}
      />
    </AbsoluteFill>
  );
}
