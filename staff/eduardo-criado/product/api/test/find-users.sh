# curl -X GET "http://localhost:8080/users/find?userId=4soy0navlc2" -v | jq

# curl -X GET "http://localhost:8080/users?userId=h9p1g44at2&query=Manu&sortField=username&sortOrder=asc&pageNumber=1&pageSize=6" -v | jq

curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoOXAxZzQ0YXQyIiwiaWF0IjoxNzU0MDUxMzk1LCJleHAiOjE3NTY2NDMzOTV9.UHb63cbDvNiiALj3P6b3VSdC8WKFyqF3vFzLMhLTRk0" http://localhost:8080/users?query=Manu\&sortField=username\&sortOrder=desc\&pageNumber=1\&pageSize=6 -v

