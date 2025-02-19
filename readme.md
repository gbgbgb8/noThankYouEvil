# No Thank You, Evil! Character Sheet Generator

## Introduction

Welcome to the **No Thank You, Evil! Character Sheet Generator**! This web-based tool allows players to easily create character sheets for the tabletop roleplaying game (TTRPG) *No Thank You, Evil!*. Based on the game's Quick Players' Guide, this generator simplifies character creation by offering dropdown selectors for character types (nouns), personality traits (adjectives), and companions, alongside text inputs for names. The character sheet updates dynamically as you make selections, providing an instant preview of your character's abilities, defense, knack, and companion details.

Whether you're a new player or a seasoned adventurer, this generator makes it fun and fast to bring your *No Thank You, Evil!* characters to life.

---

## How to Use

1. **Access the Generator**:  
   - If hosted online, visit the provided URL.  
   - For local use, download the project files and open `index.html` in your web browser.

2. **Input Character Details**:  
   - **Character Name**: Type your character's name into the text field.  
   - **Noun**: Choose a noun from the dropdown (e.g., Astronaut, Pirate, Wizard) to define your character's type. This sets base ability pools, defense type, and knack.  
   - **Adjective**: Pick an adjective (e.g., Cool, Fast, Kind) to reflect your character's personality. This adds a +1 bonus to one ability pool.  
   - **Companion Type**: Select a companion from the dropdown (e.g., Awesome Alien, Fiery Dragon). Each comes with a unique cypher (a one-time ability).  
   - **Companion Name**: Enter a name for your companion.

3. **View Your Character Sheet**:  
   - The character sheet updates instantly below the input form, showing your character's name, type, ability pools (Tough, Fast, Smart, Awesome), defense, knack, companion details, stuff, and coins.

4. **Experiment**:  
   - Try different noun and adjective combinations to tweak your character's abilities.  
   - Use your companion’s cypher wisely in your game!

---

## Features

- **Dynamic Updates**:  
  The character sheet refreshes in real-time as you choose your noun, adjective, and companion, reflecting how your selections shape your character.

- **Ability Pool Calculation**:  
  Each noun provides base values for Tough, Fast, Smart, and Awesome. Your chosen adjective boosts one of these by +1, tailoring your character's strengths.

- **Defense and Knack**:  
  Your noun determines your defense type (Armor or Hustle) and a unique knack (special ability), both displayed automatically on the sheet.

- **Companion Details**:  
  Select a companion type to see its name, type, and cypher added to your sheet, enhancing your character's story and strategy.

- **Simple Interface**:  
  Dropdowns and text fields make the tool easy to use for players of all ages and skill levels.

---

## Future Enhancements

Here are some exciting ideas we’re planning to add to the generator:

### 1. Copy Button for AI Image Generation Prompts
- **What It Does**: Creates a descriptive prompt based on your character (e.g., "A fast pirate named Jack with a fiery dragon companion named Ember").  
- **Why It’s Cool**: Copy the prompt with one click and use it in AI image tools like Grok, DALL-E, or Midjourney to generate custom character art.  
- **How It Works**: Click the button, and the prompt is copied to your clipboard, ready to paste into your preferred AI platform.

### 2. In-Browser Attribute Generation with Transformers.js
- **What It Does**: Uses [transformers.js](https://huggingface.co/docs/transformers.js/index) to generate extra character details—like backstories, quirks, or traits—right in your browser.  
- **Why It’s Cool**: Adds depth to your character without external tools, and it’s private since everything runs locally.  
- **How It Works**: Select this feature, and the tool will use lightweight AI models to suggest unique additions to your character sheet.

### 3. Random Character Sheet Generator
- **What It Does**: A button that auto-selects a noun, adjective, companion type, and generates names for both character and companion.  
- **Why It’s Cool**: Perfect for quick inspiration or instant characters for spontaneous game sessions.  
- **How It Works**: Click the button, and a fully random character sheet appears, ready to play or tweak.

---

## Technical Details

- **Files**:  
  - `index.html`: The generator’s structure.  
  - `styles.css`: Styling for a clean, user-friendly look.  
  - `script.js`: Logic for dynamic sheet updates.

- **Local Setup**:  
  1. Download or clone the project.  
  2. Keep `index.html`, `styles.css`, and `script.js` in the same folder.  
  3. Open `index.html` in a browser.

- **Contributing**:  
  This is an open-source project! Fork the repository and submit pull requests to help with features like those above. Check the repository for guidelines.

---

## Acknowledgments

This tool is inspired by the *No Thank You, Evil!* Quick Players' Guide from Monte Cook Games. Thanks to them for crafting a TTRPG that sparks imagination and joy for players young and old.

---

## License

Licensed under the [MIT License](LICENSE). Feel free to use, modify, and share this project freely.
