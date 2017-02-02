# Coding Challenge - Martian Robots
## How to Run
```
//Clone the repo locally and then run
npm install
npm run build
npm start

//To run the unit tests
npm test
```

## Technology Used
* npm for package management
* Babel for es6 support
* Jest for unit testing
* Browserify for browser modules

## What Needs Improvement
* Get jsdom to work correctly in jest to write tests against App and Board
* Use react.js or vue.js or some other front end library to remove the DOM dependancy in some classes
* Make the UI pretty
* Parse the input in a way that the user can see the robots move around the screen

# Brief
## Introduction 
Don’t stress about the challenge too much – it’s supposed to be fun and a way for us to get a
feel for your level of experience.

Here are some tips and guidelines:
* We don’t expect you to spend more than 2-3 hours on this challenge
* If you don’t have time to fully complete the challenge, please still send it in and
indicate what your next steps would be
* Use any language and frameworks you want
* KISS - Keep it Simple Stupid.
* User interface design is not the main focus of the problem
* Put your code on a public source repository (such as GitHub) and give us the URL
* We should be able to run your code without any crazy steps
* Secret tip: Make use of the sample data ;)

## Problem: Martian Robots 
### The Problem 
The surface of Mars can be modelled by a rectangular grid around which robots are able to
move according to instructions provided from Earth. You are to write a program that
determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by
y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).
A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the
instructions:
* Left : the robot turns left 90 degrees and remains on the current grid point.
* Right : the robot turns right 90 degrees and remains on the current grid point.
* Forward : the robot moves forward one grid point in the direction of the current
orientation and maintains the same orientation.

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).
There is also a possibility that additional command types may be required in the future and
provision should be made for this.

Since the grid is rectangular and bounded (…yes Mars is a strange planet), a robot that
moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that
prohibits future robots from dropping off the world at the same grid point. The scent is left at
the last grid position the robot occupied before disappearing over the edge. An instruction to
move “off” the world from a grid point from which a robot has been previously lost is simply
ignored by the current robot.

### The Input 
The first line of input is the upper-right coordinates of the rectangular world, the lower-left
coordinates are assumed to be 0, 0.

The remaining input consists of a sequence of robot positions and instructions (two lines per
robot). A position consists of two integers specifying the initial coordinates of the robot and
an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a
string of the letters “L”, “R”, and “F” on one line.

Each robot is processed sequentially, i.e., finishes executing the robot instructions before the
next robot begins execution.

The maximum value for any coordinate is 50.

All instruction strings will be less than 100 characters in length.

### The Output 
For each robot position/instruction in the input, the output should indicate the final grid
position and orientation of the robot. If a robot falls off the edge of the grid the word “LOST”
should be printed after the position and orientation.

#### Sample Input
```
5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
```
#### Sample Output
```
1 1 E
3 3 N LOST
2 3 S
```
