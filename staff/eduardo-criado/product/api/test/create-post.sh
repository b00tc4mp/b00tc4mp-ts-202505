curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoOXAxZzQ0YXQyIiwiaWF0IjoxNzU0MDUxMzk1LCJleHAiOjE3NTY2NDMzOTV9.UHb63cbDvNiiALj3P6b3VSdC8WKFyqF3vFzLMhLTRk0' \
  -d '{
    "title": "MANU POST 3",
    "description": "post de manu 3",
    "image": "https://example.com/image.jpg"
  }' \
  http://localhost:8080/posts -v | jq


# curl http://localhost:8080/hello
