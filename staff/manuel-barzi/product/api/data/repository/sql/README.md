steps

```sh
npx prisma init

mv prisma data/repository/

npx prisma migrate dev --name init --schema data/repository/sql

#DATABASE_URL=mysql://root:123123123@localhost:3306/test npx prisma migrate dev --name init --schema data/repository/sql
env $(cat .test.env | grep -v '^#' | xargs) npx prisma migrate dev --name init --schema data/repository/sql

npx prisma generate --schema data/repository/sql
```

