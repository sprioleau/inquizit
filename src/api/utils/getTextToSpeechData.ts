export default async function getTextToSpeechData(text: string) {
  const url = "https://text-to-speech-neural-google.p.rapidapi.com/generateAudioFiles";

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY as string,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST as string,
    },
    body: JSON.stringify({
      audioFormat: "mp3",
      paragraphChunks: [text],
      voiceParams: {
        name: "Wavenet-B",
        engine: "google",
        languageCode: "en-US",
      },
    }),
  };

  let data = null;
  let error = null;

  const existingItem = JSON.parse(localStorage.getItem("textToSpeechData") ?? "{}");

  try {
    if (existingItem[text]) {
      data = existingItem[text];
    } else {
      const response = await fetch(url, options);
      data = await response.json();
      localStorage.setItem("textToSpeechData", JSON.stringify({ ...existingItem, [text]: data }));
    }
  } catch (caughtError) {
    error = caughtError;
  }

  return { data, error };
}
