import fs from "fs";

let json = fs.readFileSync("./data/repository/fs/users.json", "utf8");

const users = JSON.parse(json);

console.log(users);

users.push({
  id: "user-2",
  name: "Manu U",
  email: "  manu@mail.com",
  username: "manu",
  password: "123123123",
});

console.log(users);

json = JSON.stringify(users);
fs.writeFileSync("./data/repository/fs/users.json", json);
console.log("User saved successfully");
