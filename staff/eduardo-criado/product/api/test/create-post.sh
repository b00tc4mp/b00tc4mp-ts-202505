curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0dDdwY3QzYXByNiIsImlhdCI6MTc1OTE2MjM5MywiZXhwIjoxNzYxNzU0MzkzfQ.gunvkbKeIDLr1FyZMUywUnZ-6RRC5Ov8Q4iNv4k_ooI' \
  -d '{
    "title": "Prueba user Aver2.",
    "description": "post Aver2, funciona?", 
    "image": "https://example.com/image.jpg"
  }' \
  http://localhost:8080/posts -v | jq

  # Post 1
curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0dDdwY3QzYXByNiIsImlhdCI6MTc1OTE2MjM5MywiZXhwIjoxNzYxNzU0MzkzfQ.gunvkbKeIDLr1FyZMUywUnZ-6RRC5Ov8Q4iNv4k_ooI' \
  -d '{
    "title": "Aprendiendo TypeScript",
    "description": "Hoy empecé a trabajar con TypeScript y me está gustando mucho la tipología estática.", 
    "image": "https://example.com/typescript.jpg"
  }' \
  http://localhost:8080/posts -v | jq

# Post 2
curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0dDdwY3QzYXByNiIsImlhdCI6MTc1OTE2MjM5MywiZXhwIjoxNzYxNzU0MzkzfQ.gunvkbKeIDLr1FyZMUywUnZ-6RRC5Ov8Q4iNv4k_ooI' \
  -d '{
    "title": "Configurando mi API REST",
    "description": "Por fin logré conectar mi API con MongoDB y MySQL. El patrón Repository es muy útil.", 
    "image": "https://example.com/api-rest.jpg"
  }' \
  http://localhost:8080/posts -v | jq

# Post 3
curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0dDdwY3QzYXByNiIsImlhdCI6MTc1OTE2MjM5MywiZXhwIjoxNzYxNzU0MzkzfQ.gunvkbKeIDLr1FyZMUywUnZ-6RRC5Ov8Q4iNv4k_ooI' \
  -d '{
    "title": "Debugging con Prisma",
    "description": "Tuve algunos problemas con las variables de entorno pero ya está todo solucionado.", 
    "image": "https://example.com/prisma-debug.jpg"
  }' \
  http://localhost:8080/posts -v | jq

# Post 4
curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0dDdwY3QzYXByNiIsImlhdCI6MTc1OTE2MjM5MywiZXhwIjoxNzYxNzU0MzkzfQ.gunvkbKeIDLr1FyZMUywUnZ-6RRC5Ov8Q4iNv4k_ooI' \
  -d '{
    "title": "Tests pasando al 100%",
    "description": "Después de arreglar los archivos de test, todos los tests están en verde. Gran sensación!", 
    "image": "https://example.com/tests-passing.jpg"
  }' \
  http://localhost:8080/posts -v | jq


# curl http://localhost:8080/hello
