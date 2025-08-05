curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0c3F4YnhlcjNtZyIsImlhdCI6MTc1NDQyNzQyMCwiZXhwIjoxNzU3MDE5NDIwfQ.XW9k91Lur99Znx0W4MepWS7NBzXZHdvQ8YTqKhAyH-U' \
  -d '{
    "title": "MANU POST 7",
    "description": "post de manu 7",
    "image": "https://example.com/image.jpg"
  }' \
  http://localhost:8080/posts -v | jq


# curl http://localhost:8080/hello
