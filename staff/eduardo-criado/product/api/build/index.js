import express from "express";
import { logic } from "./logic/index.js";
import { connect, disconnect } from "./data/index.js";
connect("mongodb://localhost:27017/product-api")
    .then(() => {
    const api = express();
    const jsonBodyParser = express.json();
    api.get("/hello", (req, res) => {
        res.send("Hello, World!");
    });
    api.post("/users", jsonBodyParser, (req, res) => {
        try {
            const { name, email, username, password } = req.body;
            logic
                .registerUser(name, email, username, password)
                .then(() => res.status(201).send())
                .catch((error) => {
                const { constructor, message } = error;
                console.error(error);
                res.status(500).json({ error: constructor.name, message });
            });
        }
        catch (error) {
            const { constructor, message } = error;
            console.error(error);
            res.status(500).json({ error: constructor.name, message });
        }
    });
    api.listen(8080, () => console.log("API is up on port 8080"));
    process.on("SIGINT", () => {
        console.log("API is down");
        disconnect()
            .then(() => process.exit(0))
            .catch((error) => {
            console.error(error);
            process.exit(1);
        });
    });
})
    .catch((error) => console.error(error));
