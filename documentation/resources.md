# Resources

## Backgrounds
[sssurf](https://fffuel.co/sssurf/)

## Text to Speech

[Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize?apix_params=%7B%22resource%22%3A%7B%22input%22%3A%7B%22text%22%3A%22Three%20Musketeers%22%7D%2C%22audioConfig%22%3A%7B%22audioEncoding%22%3A%22MP3%22%7D%2C%22voice%22%3A%7B%22languageCode%22%3A%22en-US%22%7D%7D%7D)

```js
/*
API Response Shape 👇
{
  "audioContent": string // base64 encoded string of mp3
}
*/

const audio = new Audio("data:audio/mp3;base64," + audioContent)
audio.play()
```

## Emoji to Image 
[Emoji to Image](https://github.com/appfigures/react-easy-emoji)