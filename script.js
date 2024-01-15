const button = document.getElementById('button')
const audioElement = document.getElementById('audio')
const caption = document.getElementById('caption')

function toggleButton() {
    button.disabled = !button.disabled
}

function speech(joke) {
    caption.hidden = false
    caption.innerText = joke
    VoiceRSS.speech({
        key: '',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function fetchJoke() {
    let joke
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming')
        const data = await response.json()
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke
        }
        speech(joke)
    } catch (error) {
        console.log("Error: ", error)
    }
}

button.addEventListener('click', () => {
    toggleButton()
    fetchJoke()
})

audioElement.addEventListener('ended', () => {
    toggleButton()
    caption.hidden = true
})