"use strict";

import "babel-polyfill";
import Board from "./board";

export default class App {
  constructor() {
    this.registerEvents();
  }

  registerEvents() {
    document.getElementById('run').addEventListener("click", () => {
      let value = document.querySelector('textarea').value;
      if (value === '') { return; }
      this.parseInput(value);
    });
  }

  parseInput(input) {
    try {
      let lines = input.split('\n');
      if (lines.length < 1) {
        return; //todo alert the user
      }

      let gridSize = lines[0].split(" ");
      let gridWidth = parseInt(gridSize[0], 10);
      let gridHeight = parseInt(gridSize[1], 10);

      if (gridWidth === null || gridHeight === null) {
        return; //todo alert the user
      }

      //Setup the board      
      if (this.board) {
        this.board.destroy();
        this.board = undefined;
      }
      this.board = new Board(document.getElementById('board'), gridWidth, gridHeight);

      //Setup the robots
      let newRobotIndex = 0;
      let currentRobotName;
      let robotOutput = [];
      for (let lineIndex = 1; lineIndex < lines.length; lineIndex++) {
        let line = lines[lineIndex];

        if (line === '') {
          //If there's a blank line between the robots then we use this index.
          newRobotIndex = lineIndex;
        } else if (lineIndex === (newRobotIndex + 1)) {
          let robotPositon = line.split(" ");
          let robotX = parseInt(robotPositon[0], 10);
          let robotY = parseInt(robotPositon[1], 10);
          let robotOrientation = robotPositon[2];

          currentRobotName = this.board.addRobot(robotX, robotY, robotOrientation);
        } else if (lineIndex === (newRobotIndex + 2)) {
          robotOutput.push(this.board.moveRobot(currentRobotName, line));

          newRobotIndex = lineIndex; //If there's no blank line between the robots then use this index
        }
      }

      this.printOutput(robotOutput);
    } catch (ex) {
      //todo better errors
      console.log("Something went wrong. Try again");
      console.error(ex);
    }
  }

  printOutput(output) {
    //Print the output from our robots
    let outputString = `<h2>Output</h2>`;
    if (output.length === 0) {
      outputString += '<p>Nothing to see here</p>';
    } else {
      outputString += output.map(text => `<p>${text}</p>`).join(' ');
    }

    document.getElementById('output').innerHTML = outputString;
  }
}

new App();