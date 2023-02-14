// Reference: https://github.com/twitter/twemoji/issues/580#issuecomment-1375859258

import emoji from "react-easy-emoji";
import { Img } from "remotion";

type Props = {
  input: string;
};

const BASE_URL = "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72";

export default function Emoji({ input }: Props) {
  const parsed = emoji(input, (code, string, offset) => {
    return (
      <Img
        key={offset}
        src={`${BASE_URL}/${code}.png`}
        data-emoji={string}
        onError={(e) => {
          console.error(e);
        }}
        alt={string}
        style={{
          width: "1em",
          height: "1em",
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
