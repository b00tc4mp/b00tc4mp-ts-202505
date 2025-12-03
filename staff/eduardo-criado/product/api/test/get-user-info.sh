# curl -X GET http://localhost:8080/users/6841a20afda0fe4010bc645c -v | jq

# curl -X GET http://localhost:8080/users/6841a20afda0fe4010bc645c -v 

# curl http://localhost:8080/users/6841a20afda0fe4010bc645c | node -e "process.stdin.on('data', d => console.log(JSON.stringify(JSON.parse(d), null, 2)))"

# curl -X GET http://localhost:8080/users/6841a20afda0fe4010bc645cCCC -v | jq


# curl -X GET http://localhost:8080/users/841a20afda0fe4010bc645c -v | jq

# curl -X GET http://localhost:8080/users/h9oz?0ax18p -v | jq

# curl -X GET http://localhost:8080/users/4soy0navlc2 -v | jq

# curl -X GET http://localhost:8080/users/4soyczf1duk -v | jq

curl -X GET http://localhost:8080/users/me -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0c3I3OGN0Zjd4ayIsImlhdCI6MTc1NDUwNTAxNywiZXhwIjoxNzU3MDk3MDE3fQ.HL7hvjHuXoFCJTaYhSRQ2HZDEOPwDGrK4wqddE_CUMc" -v | jq



