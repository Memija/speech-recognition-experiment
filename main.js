// Access to the Speech Recognition interface.
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Instances.

// Access to Speech Recognition instance.
const speechRecognition = new SpeechRecognition();

// DOM (Document Object Model) variables.

// Voices drop-down.
const voicesDropDown = document.querySelector('[name="voice"]');

// Spoken content.
const words = document.getElementById('transcript');

// Start/Stop button.
const toggleButton = document.getElementById('toggle-listening');

// Error message container.
const errorMsg = document.getElementById('error-msg');

// Paragraph that contains current final spoken content.
let paragraph = document.createElement('p');

// State variable.
let isListening = false;

// Constants
const LANG_EN_US = 'en-US';
const LANG_EN_GB = 'en-GB';
const LANG_DE_DE = 'de-DE';

const REGEX_CAT = /cat/gi;
const REGEX_DOG = /dog/gi;
const REGEX_KATZE = /katze/gi;
const REGEX_HUND = /hund/gi;

// DOM (Document Object Model) variables logic.

// Append current final spoken content.
words.appendChild(paragraph);


// DOM (Document Object Model) related functions.

/**
 * Populate voices drop-down.
 */
function populateVoicesDropDown() {
    const voices = speechSynthesis.getVoices();
    while (voicesDropDown.firstChild) {
        voicesDropDown.removeChild(voicesDropDown.firstChild);
    }
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = voice.name;
        voicesDropDown.appendChild(option);
    });
}

/**
 * Set voice.
 */
function setVoice() {
    const selectedVoice = speechSynthesis.getVoices().find(voice => voice.name === this.value);
    if (selectedVoice) {
        speechRecognition.lang = selectedVoice.lang;
    }
}

/**
 * Toggle listening state.
 */
function toggleListening() {
    if (isListening) {
        speechRecognition.stop();
        isListening = false;
        toggleButton.textContent = 'Start Listening';
        toggleButton.classList.replace('btn-danger', 'btn-primary');
    } else {
        try {
            speechRecognition.start();
            isListening = true;
            toggleButton.textContent = 'Stop Listening';
            toggleButton.classList.replace('btn-primary', 'btn-danger');
            errorMsg.style.display = 'none';
        } catch (error) {
            errorMsg.textContent = 'Error starting recognition: ' + error.message;
            errorMsg.style.display = 'block';
        }
    }
}

// Speech Recognition related variables.

// Interim results are results that are not yet final.
speechRecognition.interimResults = true;
// Set starting default language to American English.
speechRecognition.lang = LANG_EN_US;


// Speech Recognition functionality.

/**
 * Replace English language word with the emoji.
 * 
 * @param {string} transcript - Transcript value.
 * @return {string} transcript - Modified transcript value.
 */
function replaceEnglishWordWithEmoji(transcript) {
    let modifiedTranscript = transcript.replaceAll(REGEX_CAT, '🐈').replaceAll(REGEX_DOG, '🐕');

    return modifiedTranscript;
}

/**
 * Replace German language word with the emoji.
 * 
 * @param {string} transcript - Transcript value.
 * @return {string} transcript - Modified transcript value.
 */
function replaceGermanWordWithEmoji(transcript) {
    let modifiedTranscript = transcript.replaceAll(REGEX_KATZE, '🐈').replaceAll(REGEX_HUND, '🐕');

    return modifiedTranscript;
}

/**
 * Replace word with related emoji.
 * 
 * @param {string} transcript - Transcript value.
 */
function replaceWordWithEmoji(transcript) {
    let modifiedTranscript;

    switch(speechRecognition.lang) {
        case LANG_EN_US:
        case LANG_EN_GB:
            modifiedTranscript = replaceEnglishWordWithEmoji(transcript)
            break;
        case LANG_DE_DE:
            modifiedTranscript = replaceGermanWordWithEmoji(transcript)
            break;
        default:
            modifiedTranscript = replaceEnglishWordWithEmoji(transcript)
    }

    paragraph.textContent = modifiedTranscript;
}

/**
 * Write spoken words.
 */
function writeSpokenWords(e) {
    // Transcript of the spoken content.
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    replaceWordWithEmoji(transcript);

    // If the current transcript is marked as final then create a new paragraph.
    if (e.results[0].isFinal) {
        paragraph = document.createElement('p');
        words.appendChild(paragraph);
    }
}

// Event listeners.

voicesDropDown.addEventListener('change', setVoice);
toggleButton.addEventListener('click', toggleListening);

speechRecognition.addEventListener('end', () => {
    if (isListening) {
        speechRecognition.start();
    }
});

speechRecognition.addEventListener('result', writeSpokenWords);

speechRecognition.addEventListener('error', (event) => {
    errorMsg.textContent = 'Error: ' + event.error;
    errorMsg.style.display = 'block';

    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        isListening = false;
        toggleButton.textContent = 'Start Listening';
        toggleButton.classList.replace('btn-danger', 'btn-primary');
    }
});

speechSynthesis.addEventListener('voiceschanged', populateVoicesDropDown);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        replaceEnglishWordWithEmoji,
        replaceGermanWordWithEmoji
    };
}
