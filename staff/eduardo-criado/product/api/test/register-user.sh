# curl -X POST -H 'Content-Type: application/json' -d '{"name":"Peter Pan","email":"peter@pan.com","username":"peterpan","password":"123123123"}' http://localhost:8080/users -v

# curl -X POST -H 'Content-Type: application/json' -d '{"name":"Perico Palotes ","email":"perico@palotes.com","username":"periquin","password":"123123123"}' http://localhost:8080/users -v

# curl -X POST -H 'Content-Type: application/json' -d '{"name":"Pablo Motos ","email":"pablo@motos.com","username":"pablito","password":"123123123"}' http://localhost:8080/users -v | jq

curl -X POST -H 'Content-Type: application/json' -d '{"name":"No Mi","email":"nomi@mail.com","username":"nomi","password":"123123123"}' http://localhost:8080/users -v 