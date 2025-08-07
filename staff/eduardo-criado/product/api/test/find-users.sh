# curl -X GET "http://localhost:8080/users/find?userId=4soy0navlc2" -v | jq

# curl -X GET "http://localhost:8080/users?userId=h9p1g44at2&query=Manu&sortField=username&sortOrder=asc&pageNumber=1&pageSize=6" -v | jq

curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0c3I3OGN0Zjd4ayIsImlhdCI6MTc1NDU2MjM3NSwiZXhwIjoxNzU3MTU0Mzc1fQ.mnn9Cbo1Mmvk6mCTNfY4JNm7ystQMDdyfR3ZXbFV70I" http://localhost:8080/users/search?query=Manu\&sortField=username\&sortOrder=desc\&pageNumber=1\&pageSize=6 -v

