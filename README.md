# Speech Recognition Experiment

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Memija_speech-recognition-experiment&metric=alert_status)](https://sonarcloud.io/dashboard?id=Memija_speech-recognition-experiment)

A web-based Speech Recognition experiment using the Web Speech API. This project demonstrates real-time speech-to-text transcription with additional features like voice selection and automatic emoji replacement.

## Features

- **Real-time Transcription:** Converts spoken words into text instantly.
- **Voice Selection:** Allows users to select different voices available in the browser (affects the language expected by the recognizer).
- **Emoji Replacement:** Automatically replaces specific words with corresponding emojis.
  - **English:**
    - "cat" -> 🐈
    - "dog" -> 🐕
  - **German:**
    - "katze" -> 🐈
    - "hund" -> 🐕

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Bootstrap 5.3.3
- **API:** Web Speech API (SpeechRecognition, SpeechSynthesis)
- **Tooling:** Browser-Sync for development server

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm start
```
This will launch the application in your default browser at `http://localhost:3000`.

## Testing

This project includes unit tests for the logic functions (like emoji replacement).

To run the tests:
```bash
node tests/logic.test.js
```

## Author

**Anel Memić**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
