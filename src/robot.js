const rotateLeft = -90;
const rotateRight = 90;
const moveX = 50; //each square is 50px;
const moveY = -50; // each square is 50px; Y axis is in the opposite direction

export default class Robot {

  constructor(board, name, x = 0, y = 0, orientation = 'N') {
    this.board = board;
    this.name = name;
    this.currentX = x;
    this.currentY = y;
    this.currentRotate = this._orientationToDegrees(orientation);
    this.lostScents = {};
    this.isLost = false;

    this.robot = document.createElement("div");
    this.robot.className = "robot";

    if (this.board.element) {
      this.board.element.appendChild(this.robot);
    }

    if (x !== undefined && y !== undefined) {
      this.moveToSquare(x, y);
    }
  }

  setLostScents(lostScents) {
    //Set any scents from lost robots
    this.lostScents = lostScents;
  }

  move() {
    //Set the transform on the robot
    this.robot.style.transform = `translate(${this.currentX * moveX}px, ${this.currentY * moveY}px) 
                                  rotate(${this.currentRotate}deg)`;
  }

  moveToSquare(x, y) {
    //Move the robot to a start square
    this.currentX = x;
    this.currentY = y;

    this.move();
  }

  moveAroundBoard(movements) {
    //Accept a string of movements for the robot
    movements.split('').every(move => {
      let newX = this.currentX,
        newY = this.currentY;
      switch (move.toUpperCase()) {
        case 'L':
          //rotate left  
          this.currentRotate += rotateLeft;
          break;
        case 'R':
          //rotate right  
          this.currentRotate += rotateRight;
          break;
        case 'F':
          //forward (depending on direction)
          switch (this.currentRotate) {
            case 0:
              newY += 1;
              break;
            case 90:
              newX += 1;
              break;
            case 180:
              newY -= 1;
              break;
            case 270:
              newX -= 1;
              break;
          }
          break;
      }

      if (newX < 0 || newX > this.board.width || newY < 0 || newY > this.board.height) {
        //If some other robot got lost at this coordinate, ignore the move
        if (this.lostScents[`${this.currentX}${this.currentY}`] === undefined) {
          this.isLost = true;
          // We're lost. Hide the robot and exit out of the entire loop
          this.robot.style.display = 'none';
          return false;
        }
      } else {
        this.currentX = newX;
        this.currentY = newY;
      }

      if (this.currentRotate === 360) {
        this.currentRotate = 0;
      } else if (this.currentRotate < 0) {
        this.currentRotate += 360;
      }

      this.move();

      return true;
    });

    return this.currentLocation();
  }

  currentLocation() {
    //Output the current location of the robot
    let location = `${this.currentX} ${this.currentY} ${this._degreesToOrientation(this.currentRotate)}`;
    if (this.isLost) {
      location += ' LOST';
    }
    return location;
  }

  _orientationToDegrees(orientation) {
    switch (orientation) {
      case 'N':
        return 0;
      case 'E':
        return 90;
      case 'S':
        return 180;
      case 'W':
        return 270;
      default:
        throw new Error(`Invalid Orientation ${orientation}`);
    }
  }

  _degreesToOrientation(degrees) {
    switch (degrees) {
      case 0:
        return 'N';
      case 90:
        return 'E';
      case 180:
        return 'S';
      case 270:
        return 'W';
      default:
        throw new Error(`Invalid value ${degrees}`);
    }
  }
}