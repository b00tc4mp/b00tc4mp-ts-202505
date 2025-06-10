import fs from "fs"

let json = fs.readFileSync("./data/users.json").toString()

const users = JSON.parse(json)

console.log(users)

users.push({ name: "Man U", username: "manu", password: "123123123" })

console.log(users)

json = JSON.stringify(users, null, 4)

fs.writeFileSync("./data/users.json", json)