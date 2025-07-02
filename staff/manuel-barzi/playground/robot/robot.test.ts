import { robot, Orientation } from "./robot"

console.info("TEST robot")

console.info("CASE robots moves forward one step")

{
    robot.x = 0
    robot.y = 0
    robot.orientation = "E"

    robot.forward()

    console.assert(robot.x === 10, "robot x is 10")
    console.assert(robot.y === 0, "robot y is 0")
    console.assert(robot.orientation === "E", "robot orientation is E")
}

console.info("CASE robots moves backward one step")

{
    robot.x = 0
    robot.y = 0
    robot.orientation = "E"

    robot.backward()

    console.assert(robot.x === -10, "robot x is -10")
    console.assert(robot.y === 0, "robot y is 0")
    console.assert(robot.orientation === "E", "robot orientation is E")
}

console.info("CASE robots turns left one step")

{
    robot.x = 0
    robot.y = 0
    robot.orientation = "E"

    robot.left()

    console.assert(robot.x === 0, "robot x is 0")
    console.assert(robot.y === 0, "robot y is 0")
    console.assert(robot.orientation as Orientation === "N", "robot orientation is N")
}

console.info("CASE robots turns right one step")

{
    robot.x = 0
    robot.y = 0
    robot.orientation = "E"

    robot.right()

    console.assert(robot.x === 0, "robot x is 0")
    console.assert(robot.y === 0, "robot y is 0")
    console.assert(robot.orientation as Orientation === "S", "robot orientation is S")
}

console.info("CASE robots turns right one step from N to E")

{
    robot.x = 0
    robot.y = 0
    robot.orientation = "N"

    robot.right()

    console.assert(robot.x === 0, "robot x is 0")
    console.assert(robot.y === 0, "robot y is 0")
    console.assert(robot.orientation as Orientation === "E", "robot orientation is E")
}

console.info("CASE robot moves to x 100 and y 50 and ends with orientation N")

{
    robot.x = 0
    robot.y = 0
    robot.orientation = "E"

    for (let i = 0; i < 10; i++)
        robot.forward()

    robot.left()

    for (let i = 0; i < 5; i++)
        robot.backward()

    console.assert(robot.x === 100, "robot x is 100")
    console.assert(robot.y === 50, "robot y is 50")
    console.assert(robot.orientation as Orientation === "N", "robot orientation is N")
}