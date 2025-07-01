curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{
    "authorId": "6851be9ae27f9e2dc728ba9b",
    "title": "Mi post prueba",
    "description": "TESTTTTT",
    "image": "https://example.com/image.jpg"
  }' \
  http://localhost:8080/posts -v


# curl http://localhost:8080/hello
