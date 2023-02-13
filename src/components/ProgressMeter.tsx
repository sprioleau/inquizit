import { AbsoluteFill, useVideoConfig } from "remotion";

type Props = {
  progress: number;
  shouldCountDown?: boolean;
};

export default function ProgressMeter({ progress, shouldCountDown }: Props) {
  const { height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: shouldCountDown ? "unset" : 100,
          right: shouldCountDown ? 100 : "unset",
          backgroundColor: "white",
          borderRadius: 100,
          padding: 10,
          boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.25)",
        }}
      >
        {shouldCountDown ? (
          <div
            style={{
              width: 30,
              height: height * 0.75,
              borderRadius: 30,
              background: `linear-gradient(to bottom, white 0%, white ${progress}%, rebeccapurple ${progress}%, rebeccapurple 100%)`,
            }}
          />
        ) : (
          <div
            style={{
              width: 1000,
              height: 30,
              borderRadius: 30,
              background: `linear-gradient(to right, rebeccapurple 0%, rebeccapurple ${progress}%, white ${progress}%, white 100%)`,
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
}
