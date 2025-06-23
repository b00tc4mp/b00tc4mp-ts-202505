steps

```sh
npx prisma init

mv prisma data/repository/

npx prisma migrate dev --name init --schema data/repository/prisma

# esto en principio no haria falta xq ya tenemos un output (= "./generated/prisma") que nos lo genera en el schema xo es mejor eliminar el output del archivo schema.prisma
npx prisma generate --schema data/repository/prisma
```
