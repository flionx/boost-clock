# Boost Clock

Boost Clock is a minimalistic and user-friendly Pomodoro timer built with React, Redux Toolkit and Firebase. It helps you stay productive by alternating work and break sessions. You can track tasks, customize settings, view reports, and even earn achievements.

##  Demo

[Live Preview](https://boost-clock.vercel.app/)

## Features

- Simple and intuitive interface.
- Customizable work and break durations.
- Task management (create, edit, complete tasks).
- Notifications for session transitions.
- Settings.
- Achievements. 
- Report.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/flionx/boost-clock.git
   ```
2. Go to the project folder:
   ```bash
   cd boost-clock
   ```
3. Install dependencies:
   ```bash
   npm i
   ```
4. Start the project:
   ```bash
   npm run dev
   ```

## Usage

### Timer
- "Start" button – starts the countdown.
- "Reset" button – resets the timer.
- "Skip" button – skips the current session and starts the next one.
- "+/- buttons" – adjust the time.
  
### Tasks
- "Add New Task" button – adds a task. You can enter a name and optionally add a description via the "Add Description" button.
- Three-dots button – opens task options (edit, delete, etc.).
- Checkbox button – marks the task as completed and moves it to the "Completed" section.
- "Delete all" button – removes all tasks.
  
### Theme
- "Sun/Moon" button in the title bar - change the theme of the application.

### Settings
- Auto-switching between work and break sessions.
- Long break – duration of long breaks (recommended: 15 minutes).
- Long Break Interval – number of Pomodoro sessions before a long break (recommended: 4).

- Sound effects – enable or disable notification sounds.
- Repeat - number of additional repetitions of the timer end sound.

- Themes (under development, only dark and light themes are available)

## Screenshots
![Timer](https://github.com/user-attachments/assets/4beb12a6-dc16-43ef-909d-88df1688d9b7)
![Tasks](https://github.com/user-attachments/assets/36d18f45-074a-40e3-9cb4-863d612035c8)
![Quote](https://github.com/user-attachments/assets/b72fa655-f134-4c6f-9ac0-3a9b5f9a4121)
Main interface with dark theme.

## Technologies

- React
- Redux Toolkit
- JavaScript
- Firebase (auth, db)

## Inspiration  

This project was inspired by [Pomofocus.io](https://pomofocus.io)
However, the code and design were developed from scratch.

## License  

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**.   
See the full version of the [license](LICENSE).

## Links

[roadmap.sh/projects/pomodoro-timer](https://roadmap.sh/projects/pomodoro-timer)

[roadmap.sh/projects/task-tracker](https://roadmap.sh/projects/task-tracker-js)
