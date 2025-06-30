curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{
    "authorId": "h8s9yxca9f",
    "title": "Mi primer post",
    "description": "Este es el contenido del post de prueba",
    "image": "https://example.com/image.jpg"
  }' \
  http://localhost:8080/posts -v


# curl http://localhost:8080/hello
