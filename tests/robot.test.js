import Robot from "../src/robot"

test('test robot default grid position', () => {
  const robot = new Robot({ width: 5, height: 5 }, 'robot1');
  expect(robot.currentLocation()).toBe('0 0 N');
});

test('test robot initial grid position', () => {
  const robot = new Robot({ width: 5, height: 5 }, 'robot1', 3, 4, 'W');
  expect(robot.currentLocation()).toBe('3 4 W');
});

test('test robot moveToSquare with defaults', () => {
  const robot = new Robot({ width: 5, height: 5 }, 'robot1');
  robot.moveToSquare(3, 4);
  expect(robot.currentLocation()).toBe('3 4 N');
});

test('test robot moveToSquare', () => {
  const robot = new Robot({ width: 5, height: 5 }, 'robot1', 2, 4, 'S');
  robot.moveToSquare(1, 5);
  expect(robot.currentLocation()).toBe('1 5 S');
});

test('test robot moveAroundBoard Challenge 1', () => {
  const robot = new Robot({ width: 5, height: 3 }, 'robot1', 1, 1, 'E');
  robot.moveAroundBoard('RFRFRFRF');
  expect(robot.currentLocation()).toBe('1 1 E');
});

test('test robot moveAroundBoard Challenge 2', () => {
  const robot = new Robot({ width: 5, height: 3 }, 'robot1', 3, 2, 'N');
  robot.moveAroundBoard('FRRFLLFFRRFLL');
  expect(robot.currentLocation()).toBe('3 3 N LOST');
});

test('test robot moveAroundBoard Challenge 3 (without scent)', () => {
  const robot = new Robot({ width: 5, height: 3 }, 'robot1', 0, 3, 'W');
  robot.moveAroundBoard('LLFFFLFLFL');
  expect(robot.currentLocation()).toBe('3 3 N LOST');
});

test('test robot moveAroundBoard Challenge 3 (with scent)', () => {
  const robot = new Robot({ width: 5, height: 3 }, 'robot1', 0, 3, 'W');
  robot.setLostScents({ '33': true });
  robot.moveAroundBoard('LLFFFLFLFL');
  expect(robot.currentLocation()).toBe('2 3 S');
});