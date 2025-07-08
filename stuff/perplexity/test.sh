curl --location 'https://api.perplexity.ai/chat/completions' \
--header 'accept: application/json' \
--header 'content-type: application/json' \
--header 'Authorization: Bearer API_KEY' \
--data '{
  "model": "sonar-pro",
  "messages": [
    {
      "role": "system",
      "content": "Be precise and concise."
    },
    {
      "role": "user",
      "content": "How many stars are there in our galaxy?"
    }
  ]
}' \
-v