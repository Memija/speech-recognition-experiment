const assert = require('node:assert');

// Mock browser environment
globalThis.window = {
    SpeechRecognition: class {
        addEventListener() {}
        start() {}
        stop() {}
    },
    webkitSpeechRecognition: function() {}
};
globalThis.SpeechRecognition = globalThis.window.SpeechRecognition;
globalThis.SpeechSynthesisUtterance = function() {};
globalThis.document = {
    querySelector: () => ({ addEventListener: () => {} }),
    getElementById: () => ({
        appendChild: () => {},
        style: {},
        classList: { replace: () => {} },
        addEventListener: () => {}
    }),
    createElement: () => ({ textContent: '' }),
};
globalThis.speechSynthesis = {
    getVoices: () => [],
    addEventListener: () => {}
};

// Now require main.js
const { replaceEnglishWordWithEmoji, replaceGermanWordWithEmoji } = require('../main.js');

// Test English replacement
console.log('Testing English Replacement...');
assert.strictEqual(replaceEnglishWordWithEmoji('I have a cat'), 'I have a 🐈');
assert.strictEqual(replaceEnglishWordWithEmoji('Dog is running'), '🐕 is running');
assert.strictEqual(replaceEnglishWordWithEmoji('Cat and Dog'), '🐈 and 🐕');
assert.strictEqual(replaceEnglishWordWithEmoji('No animals here'), 'No animals here');
console.log('Passed!');

// Test German replacement
console.log('Testing German Replacement...');
assert.strictEqual(replaceGermanWordWithEmoji('Ich habe eine katze'), 'Ich habe eine 🐈');
assert.strictEqual(replaceGermanWordWithEmoji('Hund läuft'), '🐕 läuft');
assert.strictEqual(replaceGermanWordWithEmoji('Katze und Hund'), '🐈 und 🐕');
console.log('Passed!');
