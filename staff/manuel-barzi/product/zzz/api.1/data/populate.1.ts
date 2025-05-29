import { connect, disconnect } from "mongoose"
import { User } from "./models"
// import { IUserDoc } from "./types"

connect("mongodb://localhost:27017/product-edu")
    .then(() => {
        // return User.deleteMany()
        //     .catch(error => { throw new Error(error.message) })

        // return User.create({ name: "Edu", email: "edu@mail.com", avatar: "http://image.com/edu", username: "edu", password: "123123123" })
        //     .catch(error => { throw new Error(error.message) })
        //     .then(() => console.log("user created"))

        // const user = new User({ name: "Edu", email: "edu@mail.com", avatar: "http://image.com/edu", username: "edu", password: "123123123" })

        // return user.save()
        //     .catch(error => { throw new Error(error.message) })
        //     .then(() => console.log("user created"))

        return User.findById("68360519eadd29752ce2b85a").lean()
            .catch(error => { throw new Error(error.message) })
            .then(user => {
                if (!user) throw new Error("user not found")

                console.log(user.name)
            })
    })
    .catch(error => console.error(error))
    .finally(() => disconnect())