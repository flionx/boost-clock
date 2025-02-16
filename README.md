# Boost Clock

A handy and minimalistic Pomodoro timer built using React. Helps you manage your time effectively, alternating between work and rest, with the ability to create tasks.

## Features

- Simple and intuitive interface.
- Setting the time for work and rest.
- Notifications when a step is completed.
- Possibility to compose tasks.

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
  
#### Theme
- "Sun/Moon" button in the title bar - change the theme of the application.

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
