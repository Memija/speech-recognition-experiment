// Access to the Speech Recognition interface.
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


// Instances.

// Access to Speech Synthesis Utterance instance.
const speechSynthesisUtterance = new SpeechSynthesisUtterance();
// Access to Speech Recognition instance.
const speechRecognition = new SpeechRecognition();


// DOM (Document Object Model) variables.

// Voices drop-down.
const voicesDropDown = document.querySelector('[name="voice"]');

// Spoken content.
const words = document.getElementById('transcript');

// Paragraph that contains current final spoken content.
var paragraph = document.createElement('p');


// DOM (Document Object Model) variables logic.

// Append current final spoken content.
words.appendChild(paragraph);


// DOM (Document Object Model) related functions.

/**
 * Populate voices drop-down.
 */
function populateVoicesDropDown() {
    voicesDropDown.innerHTML = speechSynthesis
        .getVoices()
        .map(voice => `<option value="${voice.name}">${voice.name}</option>`)
        .join('');
}

/**
 * Set voice.
 */
function setVoice() {
    speechRecognition.lang = speechSynthesis
        .getVoices()
        .find(voice => voice.name === this.value)
        .lang;
}

// Speech Recognition related variables.

// Interim results are results that are not yet final.
speechRecognition.interimResults = true;
// Set starting default language to American English.
speechRecognition.lang = 'en-US';


// Speech Recognition functionality.

/**
 * Replace English language word with the emoji.
 * 
 * @param {string} transcript - Transcript value.
 * @return {string} transcript - Modified transcript value.
 */
function replaceEnglishWordWithEmoji(transcript) {
    let modifiedTranscript = transcript.replace(/cat/gi, '🐈').replace(/dog/gi, '🐕');

    return modifiedTranscript;
}

/**
 * Replace German language word with the emoji.
 * 
 * @param {string} transcript - Transcript value.
 * @return {string} transcript - Modified transcript value.
 */
function replaceGermanWordWithEmoji(transcript) {
    modifiedTranscript = transcript.replace(/katze/gi, '🐈').replace(/hund/gi, '🐕');

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
        case 'en-US':
        case 'en-GB':
            modifiedTranscript = replaceEnglishWordWithEmoji(transcript)
            break;
        case 'de-DE':
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
    let transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    // If the current transcript is marked as final then write the content.
    if (e.results[0].isFinal) {
        replaceWordWithEmoji(transcript);

        paragraph = document.createElement('p');

        words.appendChild(paragraph);
    }
}

// Speech Recognition start.
speechRecognition.start();


// Event listeners.

voicesDropDown.addEventListener('change', setVoice);
speechRecognition.addEventListener('end', speechRecognition.start);
speechRecognition.addEventListener('result', writeSpokenWords);
speechSynthesis.addEventListener('voiceschanged', populateVoicesDropDown);
