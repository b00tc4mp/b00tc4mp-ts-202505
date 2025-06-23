steps

```sh
npx prisma init

mv prisma data/repository/

npx prisma migrate dev --name init --schema data/repository/sql

npx prisma generate --schema data/repository/sql
```

