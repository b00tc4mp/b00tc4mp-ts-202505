/*
REQUIREMENTS
- state: xy, orientation (N,E,S,W)
- behavior: forward,backward,right,left by steps
*/

type Robot = {
    x: number
    y: number
    orientation: "N" | "E" | "S" | "W"

    forward: () => void
    backward: () => void
    right: () => void
    left: () => void
}

export const robot: Robot = {
    x: 0,
    y: 0,
    orientation: "E",

    forward() {
        switch (robot.orientation) {
            case "E":
                robot.x = robot.x + 10
                break
            case "S":
                robot.y = robot.y + 10
                break
            case "W":
                robot.x = robot.x - 10
                break
            case "N":
                robot.y = robot.y - 10
                break
        }
    },

    backward() {
        switch (robot.orientation) {
            case "E":
                robot.x = robot.x - 10
                break
            case "S":
                robot.y = robot.y - 10
                break
            case "W":
                robot.x = robot.x + 10
                break
            case "N":
                robot.y = robot.y + 10
                break
        }
    },

    left() {
        switch (robot.orientation) {
            case "E":
                robot.orientation = "N"
                break
            case "S":
                robot.orientation = "E"
                break
            case "W":
                robot.orientation = "S"
                break
            case "N":
                robot.orientation = "W"
                break
        }
    },

    right() {
        switch (robot.orientation) {
            case "E":
                robot.orientation = "S"
                break
            case "S":
                robot.orientation = "W"
                break
            case "W":
                robot.orientation = "N"
                break
            case "N":
                robot.orientation = "E"
                break
        }
    }
}