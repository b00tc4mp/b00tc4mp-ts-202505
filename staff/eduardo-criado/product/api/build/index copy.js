import express from "express";
import { logic } from "./logic/index.js";
import { connect, disconnect } from "./data/repository/no-sql/index.js";
// import jwt from "jsonwebtoken";
import jwt from "./utils/jsonwebtoken-promised.js";
import "dotenv/config";
const { JWT_SECRET = "" } = process.env;
const { PORT = 8080, MONGO_URL = "mongodb://localhost:27017/product-api" } = process.env;
connect(MONGO_URL)
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
    api.post("/users/auth", jsonBodyParser, (req, res, next) => {
        try {
            const { username, password } = req.body;
            logic
                .authenticateUser(username, password)
                .then((userId) => {
                jwt
                    .sign({ userId }, JWT_SECRET, {
                    expiresIn: "30d",
                })
                    .then((token) => {
                    res.json({ token, userId });
                });
            })
                .catch((error) => {
                next(error);
                const { constructor, message } = error;
                res.status(500).json({ error: constructor.name, message });
            });
        }
        catch (error) {
            const { constructor, message } = error;
            res.status(500).json({ error: constructor.name, message });
        }
    });
    api.get("/users/:userId", (req, res) => {
        try {
            const { userId } = req.params;
            logic
                .getUserInfo(userId)
                .then((userInfo) => res.json(userInfo))
                .catch((error) => {
                const { constructor, message } = error;
                res.status(500).json({ error: constructor.name, message });
            });
        }
        catch (error) {
            const { constructor, message } = error;
            res.status(500).json({ error: constructor.name, message });
        }
    });
    api.post("/posts", jsonBodyParser, (req, res) => {
        try {
            const { authorId, title, description, image } = req.body;
            logic
                .createPost(authorId, title, description, image)
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
    api.get("/users", (req, res) => {
        try {
            const { userId, query, sortField, sortOrder, pageNumber, pageSize } = req.query;
            logic
                .findUsers(typeof userId === "string" ? userId : "", typeof query === "string" ? query : "", typeof sortField === "string"
                ? sortField
                : "username", typeof sortOrder === "string"
                ? sortOrder
                : "asc", Number(pageNumber), Number(pageSize))
                .then((users) => res.json(users))
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
    api.listen(PORT, () => console.log(`API is up & listening on port ${PORT}`));
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
//# sourceMappingURL=index%20copy.js.map