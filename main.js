/* eslint-disable no-alert */
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
const toggleButton = () => {
    button.disabled = !button.disabled;
};

// Passing our jokes to VoiceRSS API
const tellMe = (joke) => {
    VoiceRSS.speech({
        key: apiKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
};

// Get jokes from joke API
const getJokes = async () => {
    let joke = '';
    const apiUrl =
        'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // TTS
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        alert(
            `Something went wrong, please try later or contact the website owner and report this error : ${error}`,
        );
    }
};

// Event Listners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
