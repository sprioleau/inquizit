import { AbsoluteFill, Img } from "remotion";

export default function Card() {
  return (
    <AbsoluteFill
      style={{
        background: "rebeccapurple",
        width: 300,
        height: 300,
      }}
    >
      <h2>London</h2>
      <Img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/London_Big_Ben_Phone_box.jpg/861px-London_Big_Ben_Phone_box.jpg"
        alt="image of London"
      />
    </AbsoluteFill>
  );
}
