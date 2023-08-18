# chat.znueni.app
This repos contains the code to build and run a small chat app answering questions to swiss food and pulp fiction.

## Try it out!
1. Go to [chat.znueni.app](https://chat.znueni.app)
2. Click the 'lock'-button on the upper right
3. Add your own OpenAI API key and press ok (will be stored in the localstorage of the browser)
4. Start chatting!

![example response](/images/example_01.png)
Example of a chat response.

# Getting started!
## Prerequisites
* Node.js
* VS Code
* OpenAI API Key (paid account needed, see: [https://platform.openai.com/](https://platform.openai.com/))

## Start App
* add an `.env`-file in the `root`-folder containing following content:
```
REACT_APP_OPENAI_API_KEY=[YOUR-OPENAI-API-KEY]
```
* install node.js dependencies with `npm install`
* start the frontend with `npm start`
* as soon the development server started, the website should open in an new browser tab