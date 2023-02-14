// Reference for voice parameters: https://rapidapi.com/rahilkhan224/api/text-to-speech-neural-google/tutorials/text-to-speech-tutorial

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
        name: "Amy",
        engine: "neural",
        languageCode: "en-GB",
      },
    }),
  };

  let data = null;
  let error = null;

  // const localStorageKey = `tts:${text}`;

  // const existingItem = JSON.parse(localStorage.getItem(localStorageKey) ?? "null");

  try {
    // if (existingItem) {
    //   data = existingItem;
    // } else {
    const response = await fetch(url, options);
    data = await response.json();
    // localStorage.setItem(localStorageKey, JSON.stringify(data));
    // }
  } catch (caughtError) {
    error = caughtError;
  }

  return { data, error };
}
