import StaggeredText from "./StaggeredText";

export default function Logo() {
  return (
    <h1
      style={{
        fontSize: 150,
        color: "gold",
        margin: 0,
        lineHeight: 1.1,
      }}
    >
      <StaggeredText text="inquizit" />
    </h1>
  );
}
