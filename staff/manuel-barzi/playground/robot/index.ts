import { robot } from "./robot.js"

const robotHead = document.createElement("div")

robotHead.style.backgroundColor = "black"
robotHead.style.position = "absolute"
robotHead.style.width = "100px"
robotHead.style.height = "100px"

const robotEye1 = document.createElement("div")

robotEye1.style.backgroundColor = "white"
robotEye1.style.position = "absolute"
robotEye1.style.width = "20px"
robotEye1.style.height = "20px"
robotEye1.style.left = "20px"
robotEye1.style.top = "20px"

robotHead.appendChild(robotEye1)

const robotEye2 = document.createElement("div")

robotEye2.style.backgroundColor = "white"
robotEye2.style.position = "absolute"
robotEye2.style.width = "20px"
robotEye2.style.height = "20px"
robotEye2.style.left = "60px"
robotEye2.style.top = "20px"

robotHead.appendChild(robotEye2)

const robotMouth = document.createElement("div")

robotMouth.style.backgroundColor = "white"
robotMouth.style.position = "absolute"
robotMouth.style.width = "60px"
robotMouth.style.height = "20px"
robotMouth.style.left = "20px"
robotMouth.style.top = "60px"

robotHead.appendChild(robotMouth)

document.body.appendChild(robotHead)

document.addEventListener("keydown", event => {
    const key = event.key

    console.log(key)

    switch (key) {
        case "ArrowUp":
            robot.forward()
            break

        case "ArrowDown":
            robot.backward()
            break

        case "ArrowRight":
            robot.right()
            break

        case "ArrowLeft":
            robot.left()
            break
    }

    console.log(robot)

    robotHead.style.left = robot.x + "px"
    robotHead.style.top = robot.y + "px"
})