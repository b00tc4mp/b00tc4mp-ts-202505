curl -X GET http://localhost:8080/users/6841a20afda0fe4010bc645a -v | jq

# curl -X GET http://localhost:8080/users/6841a20afda0fe4010bc645c -v 

# curl http://localhost:8080/users/6841a20afda0fe4010bc645c | node -e "process.stdin.on('data', d => console.log(JSON.stringify(JSON.parse(d), null, 2)))"