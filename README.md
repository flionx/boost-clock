# Boost Clock

A handy and minimalistic Pomodoro timer based on React + Redux Toolkit. Helps you manage your time efficiently by alternating between work and rest, with the ability to create tasks, report views, customizations and even achievements.

##  Demo

[Live Preview](https://boost-clock.vercel.app/)

## Features

- Simple and intuitive interface.
- Setting the time for work and rest.
- Notifications when a step is completed.
- Possibility to compose tasks.
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
3. Install dependencies :
   ```bash
   npm i
   ```
4. Start the project:
   ```bash
   npm run dev
   ```

## Usage

### Timer
- button “Start” - start the countdown.
- When finished, the timer will automatically switch to rest time, and vice versa.
- button “Reset” - reset the time;
-button “Skip” - skip the current session and start the next one.
- +/- buttons - time setting
  
### Tasks
- “Add New Task” button - add a task, enter its name and optionally add a description by clicking on the “Add Description” button.
-Button with three dots to the right of the task name - task parameters.
-Checkbox button to the left of the task title - the task will be moved to the “Completed” category.
- "Delete all" button - delete all tasks.
  
### Theme
- "Sun/Moon" button in the title bar - change the theme of the application.

### Settings
- Auto switching to automatically switch to a specific timer type.
- Long break - allows you to enter the length of a long break (recommended 15).
- Long Break interval - number of pomodoro rounds between long breaks(recommended 4) 

- Sound on allows you to turn sounds on/off.
- Repeat - number of additional repetitions of the timer end sound.

- Themes (under development, only dark and light themes are available)

## Screenshots
![Главная](https://github.com/user-attachments/assets/1c0452d3-b845-4984-8d05-ada868c49848) 
![Таймер](https://github.com/user-attachments/assets/365f7d28-daf1-469f-bf11-3f550ebd35a4)  
Main interface with dark theme.

## Technologies

- React
- Redux Toolkit
- JavaScript
- HTML/CSS

## Inspiration  

This project was inspired by [Pomofocus.io](https://pomofocus.io)
However, the code and design is developed from scratch.

## License  

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**.   
See the full version of the [license](LICENSE).
