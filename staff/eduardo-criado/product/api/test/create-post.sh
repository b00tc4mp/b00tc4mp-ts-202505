curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0c3I3OGN0Zjd4ayIsImlhdCI6MTc1NDUwNTAxNywiZXhwIjoxNzU3MDk3MDE3fQ.HL7hvjHuXoFCJTaYhSRQ2HZDEOPwDGrK4wqddE_CUMc' \
  -d '{
    "title": "MANU POST 7",
    "description": "post de manu 7",
    "image": "https://example.com/image.jpg"
  }' \
  http://localhost:8080/posts -v | jq


# curl http://localhost:8080/hello
