curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODg5ZWU0ZTA0NmRmMTE4ZjkyM2RiYjMiLCJpYXQiOjE3NTkxNTE1MTMsImV4cCI6MTc2MTc0MzUxM30.UXX1nPqyWGhxj4gSKRxGhm8-6dmaoWM112abGEvhjNA' \
  -d '{
    "title": "MANU de Nomi.",
    "description": "post de manu nomi",
    "image": "https://example.com/image.jpg"
  }' \
  http://localhost:8080/posts -v | jq


# curl http://localhost:8080/hello
