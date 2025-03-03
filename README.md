# Boost Clock

Boost Clock is a minimalistic and user-friendly Pomodoro timer built with React and Redux Toolkit. It helps you stay productive by alternating work and break sessions. You can create tasks, customize settings, view reports, and even earn achievements.

##  Demo

[Live Preview](https://boost-clock.vercel.app/)

## Features

- Simple and intuitive interface.
- Setting the time for work and rest.
- Notifications when a step is completed.
- Task management.
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
- +/- buttons - time setting.
- When finished, the timer will automatically switch to rest time, and vice versa.
  
### Tasks
- "Add New Task" button – adds a task. You can enter a name and optionally add a description via the "Add Description" button.
- Three-dots button – opens task options (edit, delete, etc.).
- Checkbox button – marks the task as completed and moves it to the "Completed" section.
- "Delete all" button - delete all tasks.
  
### Theme
- "Sun/Moon" button in the title bar - change the theme of the application.

### Settings
- Auto-switching between work and break sessions.
- Long break – duration of long breaks (recommended: 15 minutes).
- Long Break Interval – number of Pomodoro sessions before a long break (recommended: 4).

- Sound on – enable or disable notification sounds.
- Repeat - number of additional repetitions of the timer end sound.

- Themes (under development, only dark and light themes are available)

## Screenshots
![Главная](https://github.com/user-attachments/assets/1c0452d3-b845-4984-8d05-ada868c49848) 
![Таймер](https://github.com/user-attachments/assets/365f7d28-daf1-469f-bf11-3f550ebd35a4)  
Main interface with dark theme.

## Technologies

- React
- React-router-dom 
- Redux Toolkit
- JavaScript
- Firebase (auth + db) ⌛

## Inspiration  

This project was inspired by [Pomofocus.io](https://pomofocus.io)
However, the code and design is developed from scratch.

## License  

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**.   
See the full version of the [license](LICENSE).
