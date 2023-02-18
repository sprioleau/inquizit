// Reference for voice parameters: https://rapidapi.com/rahilkhan224/api/text-to-speech-neural-google/tutorials/text-to-speech-tutorial

export default async function getTextToSpeechData(textStrings: string[]) {
  const url = "https://text-to-speech-neural-google.p.rapidapi.com/generateAudioFiles";

  function getOptions(text: string) {
    return {
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
  }

  let data = null;
  let error = null;

  try {
    const filteredTextStrings = textStrings.filter(
      (text) => !JSON.parse(localStorage.getItem(`tts:${text}`) ?? "null"),
    );
    const promises = filteredTextStrings.map((text) => fetch(url, getOptions(text)));
    const responses = await Promise.all(promises);
    const ttsData = await Promise.all(responses.map((response) => response.json()));
    console.log("🥞 ~ file: getTextToSpeechData.ts:36 ~ getTextToSpeechData ~ ttsData", ttsData);
    const audioStreams = ttsData.map((item) => "data:audio/mp3;base64," + (item.audioStream ?? ""));

    audioStreams.forEach((audioStream, index) => {
      console.log(
        `🚀 ~ Truncated audioStream for ${textStrings[index]}: ${audioStream.slice(0, 50)}`,
      );
      const localStorageKey = `tts:${textStrings[index]}`;
      localStorage.setItem(JSON.stringify(localStorageKey), audioStream);
    });

    data = audioStreams;
  } catch (caughtError) {
    error = caughtError;
  }

  return { data, error };
}
