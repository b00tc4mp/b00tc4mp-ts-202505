import dotenv from "dotenv";
dotenv.config();

// console.log("API KEY:", process.env.PERPLEXITY_API_KEY);

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
        content: "Be precise and concise.",
      },
      {
        role: "user",
        content: "How many stars are there in our galaxy?",
      },
    ],
  }),
})
  .then((response) => response.json())
  .then((body) => console.log(body))
  .catch((error) => console.error(error));
