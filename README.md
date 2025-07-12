# Timer App

A modern React Native timer application with category grouping, progress visualization, history, and dark/light theme support.

## Features
- Add, start, pause, reset and delete timers
- Group timers by category (expand/collapse)
- Bulk actions: start, pause, reset all timers in a category
- Progress bar for each timer
- History tab for completed timers
- Local data persistence (AsyncStorage)
- Beautiful UI with dark/light theme and theme toggle

## Installation

### Prerequisites
- Node.js and npm
- Expo CLI (recommended) or React Native CLI

### 1. Clone the repository
```
git clone https://github.com/amanshrivastava1000/Timer-App.git

cd Timer-App

### 2. Install dependencies
```
npm install
```

### 3. Start the app
- For Expo:
  ```
  npx expo start
  ```
- For bare React Native:
  ```
  npx react-native run-android
  # or
  npx react-native run-ios
  ```

## Usage & Navigation

- **Home Tab:**
  - View all timers grouped by category.
  - Expand/collapse categories.
  - Use the palette icon (top right) to toggle dark/light theme.
  - Use the green "+ Add Timer" button to add a new timer.
  - Use the play, pause, and reset icons on each timer for control.
  - Use the trash icon to delete a timer.
  - Use the action icons (play, pause, refresh) to control timers in a category.

- **Add Timer Tab:**
  - Fill in the timer name, duration (in seconds), and category.
  - Tap the save button to add the timer.

  ## Theming
- The app supports both dark and light themes.
- Tap the moon-outline in the top right of the Home screen to toggle the theme.

- **History Tab:**
  - View a list of completed timers with their completion time.
  - Only unique timer names are shown (latest completion).

## Dependencies
- React Native
- @react-navigation/native, @react-navigation/bottom-tabs
- @react-native-async-storage/async-storage

## License
MIT
