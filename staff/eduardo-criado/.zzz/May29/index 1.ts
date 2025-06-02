import express from "express";

const api = express();

const jsonBodyParser = express.json();

api.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

api.post("/users", jsonBodyParser, (req, res) => {
  console.log(req.body);

  try {
    res.status(201).send();
  } catch (error) {
    if (error instanceof Error) {
      const { constructor, message } = error;
      // const { constructor, message } = error as Error;
      console.error(error);
      res.status(500).json({ error: constructor.name, message });
    }
  }
});

api.listen(8080, () => {
  console.log("API is up on port 8080");
});

// api.listen(8080, () =>
//   console.log("API is up on port 8080"))
