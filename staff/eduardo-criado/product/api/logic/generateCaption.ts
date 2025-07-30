import { GenerateCaption } from "./types.js";
import { validate } from "./validate.js";
import { UserRepository } from "../data/repository/sql/UserRepository.js";
import { NotFoundError, SystemError } from "./errors.js";

export const generateCaption: GenerateCaption = (userId, keywords) => {
  validate.id(userId, "userId");
  validate.keyWords(keywords, "key words");

  return UserRepository.findById(userId)
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      return (
        fetch("https://api.perplexity.ai/chat/completions", {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          },

          body: JSON.stringify({
            model: "sonar-pro",
            messages: [
              {
                role: "system",
                content: "Be precise and concise",
              },
              {
                role: "user",
                content: `Give me only one caption which contains these words for one post: ${keywords.join(
                  " "
                )}`,
              },
            ],
          }),
        })
          .then((response) => response.json())
          // .then((body) => body)
          .then((body) => {
            // return body;
            return body.choices[0].message.content;
          })
          .catch((error) => {
            console.error(error);
            throw new SystemError("Error generating caption: " + error.message);
          })
      );
    });
};
