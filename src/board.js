import Robot from "./robot"

export default class Board {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    this.currentRobotIndex = 1;
    this.robots = {};
    this.lostScents = {};

    this.create();
  }

  create() {
    for (let rowIndex = 0; rowIndex <= this.height; rowIndex++) {
      let row = document.createElement("div");
      row.className = "board-row";

      for (let columnIndex = 0; columnIndex <= this.width; columnIndex++) {
        let column = document.createElement("div");
        column.className = "board-cell";

        row.appendChild(column);
      }

      this.element.appendChild(row);
    }
  }

  addRobot(x, y, orientation) {
    let robotName = `robot${this.currentRobotIndex++}`;
    let board = {
      element: this.element,
      width: this.width,
      height: this.height
    };

    let robot = new Robot(board, robotName, x, y, orientation);
    this.robots[robotName] = robot;
    robot.setLostScents(this.lostScents);

    return robotName;
  }

  moveRobot(robotName, movements) {

    let robot = this.robots[robotName];
    let output = robot.moveAroundBoard(movements);

    if (robot.isLost) {
      this.lostScents[`${robot.currentX}${robot.currentY}`] = true;
    }

    return output;
  }

  destroy() {
    //Destroy all DOM elements
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
  }
}