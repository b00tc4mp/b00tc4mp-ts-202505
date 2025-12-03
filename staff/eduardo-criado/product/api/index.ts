import express from "express";
import { logic } from "./logic/index.js";
import { connect, disconnect } from "./data/repository/no-sql/index.js";
// import jwt from "jsonwebtoken";
import jwt from "./utils/jsonwebtoken-promised.js";
// import { validateJWT, validateJWTWrapper } from "./utils/validatejwt.js";
import {
  CredentialsError,
  DuplicityError,
  NotFoundError,
  ValidationError,
  SystemError,
} from "com";

import cors from "cors";

const { JWT_SECRET = "my-secret" } = process.env;

const { PORT = 8080, MONGO_URL = "mongodb://localhost:27017/product-api" } =
  process.env;

connect(MONGO_URL)
  .then(() => {
    const api = express();

    api.use(cors());

    // api.use(
    //   cors({
    //     origin: "http://localhost:5173", // o el origen de tu frontend
    //     methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    //     allowedHeaders: ["Content-Type", "Authorization"],
    //   })
    // );

    const jsonBodyParser = express.json();

    api.get("/hello", (req, res) => {
      res.send("Hello, World!");
    });

    api.post("/users", jsonBodyParser, (req, res, next) => {
      try {
        const { name, email, username, password } = req.body;

        logic
          .registerUser(name, email, username, password)
          .then(() => res.status(201).send())
          .catch((error) => next(error));
      } catch (error) {
        next(error);
      }
    });

    api.post("/users/auth", jsonBodyParser, (req, res, next) => {
      const { username, password } = req.body;

      try {
        logic
          .authenticateUser(username, password)
          .then((userId) => {
            jwt
              .sign({ sub: userId }, JWT_SECRET, {
                expiresIn: "30d",
              })
              .then((token) => {
                res.json(token);
              });
          })
          .catch((error) => {
            next(error);
          });
      } catch (error) {
        next(error);
      }
    });

    api.get("/users/me", (req, res, next) => {
      try {
        const token = req.headers.authorization!.slice(7);

        jwt
          .verify(token, JWT_SECRET)
          .then((payload) => {
            const { sub: userId } = payload as { sub: string };

            return logic
              .getUserInfo(userId)
              .then((userInfo) => res.json(userInfo));
          })
          .catch((error) => {
            next(error);
          });
      } catch (error) {
        next(error);
      }
    });

    api.post("/posts", jsonBodyParser, (req, res, next) => {
      try {
        const token = req.headers.authorization!.slice(7);

        jwt
          .verify(token, JWT_SECRET)
          .then((payload) => {
            const { sub: userId } = payload as { sub: string };

            const { title, description, image } = req.body;

            return logic
              .createPost(userId, title, description, image)
              .then(() => res.status(201).send());
          })
          .catch((error) => {
            next(error);
          });
      } catch (error) {
        next(error);
      }
    });

    api.get("/users/search", (req, res, next) => {
      try {
        const token = req.headers.authorization!.slice(7);

        jwt
          .verify(token, JWT_SECRET)
          .then((payload) => {
            const { sub: userId } = payload as { sub: string };

            const { query, sortField, sortOrder, pageNumber, pageSize } =
              req.query as unknown as {
                query: string;
                sortField: "name" | "username" | "email";
                sortOrder: "asc" | "desc";
                pageNumber: string;
                pageSize: string;
              };

            return logic
              .findUsers(
                userId,
                query,
                sortField,
                sortOrder,
                parseInt(pageNumber),
                parseInt(pageSize)
              )
              .then((users) => res.json(users));
          })
          .catch((error) => {
            next(error);
          });
      } catch (error) {
        next(error);
      }
    });

    api.use(
      (
        error: Error,
        req: express.Request,
        res: express.Response,
        next: () => void
      ) => {
        let status = 500,
          errorName = SystemError.name,
          message = error.message;

        if (error instanceof ValidationError) {
          status = 400;
          errorName = ValidationError.name;
        } else if (error instanceof NotFoundError) {
          status = 404;
          errorName = NotFoundError.name;
        } else if (error instanceof CredentialsError) {
          status = 401;
          errorName = CredentialsError.name;
        } else if (error instanceof DuplicityError) {
          status = 409;
          errorName = DuplicityError.name;
        }

        res.status(status).json({ error: errorName, message });
      }
    );

    api.listen(PORT, () =>
      console.log(`API is up & listening on port ${PORT}`)
    );

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
