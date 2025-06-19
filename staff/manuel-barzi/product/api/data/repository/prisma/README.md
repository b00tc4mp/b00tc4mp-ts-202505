steps

```sh
npx prisma init

mv prisma data/repository/

npx prisma migrate dev --name init --schema data/repository/prisma

npx prisma generate --schema data/repository/prisma
```

