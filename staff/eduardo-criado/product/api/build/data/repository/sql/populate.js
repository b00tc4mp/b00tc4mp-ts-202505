// import { PrismaClient, User } from "@prisma/client";
// const prisma = new PrismaClient();
// try {
//   const chema = await prisma.user.create({
//     data: {
//       id: "user-0002",
//       name: "Chemita G",
//       email: "chemag@mail.com",
//       username: "chemita",
//       password: "123123123",
//     },
//   });
//   console.log("user created");
//   //   const paco = await prisma.user.create({
//   //     data: {
//   //       id: "user-0001",
//   //       name: "Paquito",
//   //       email: "paquito@mail.com",
//   //       username: "paquito",
//   //       password: "123123123",
//   //     },
//   //   });
//   console.log("user created");
//   const allUsers = await prisma.user.findMany({});
//   console.log(allUsers);
// } catch (error) {
//   console.error(error);
// }
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// await prisma.user.deleteMany({});
prisma.user
    .create({
    data: {
        id: "user-0005",
        name: "Chechu Polo",
        email: "chepolog@mail.com",
        username: "chepolo",
        password: "123123123",
    },
})
    .then((chepolo) => console.log("user created", chepolo))
    .catch((error) => console.error(error));
// .then((chemita) => console.log("user created", chemita))
prisma.user.create({
    data: {
        id: "user-0006",
        name: "Ed Uchavi",
        email: "edu1@mail.com",
        username: "eduvi",
        password: "123123123",
    },
});
console.log("user created");
// .then((edu) => console.log("user created", edu));
prisma.user
    .create({
    data: {
        id: "user-0007",
        name: "Laura Sanchez",
        email: "lsanchez@mail.com",
        username: "laraez",
        password: "123123123",
    },
})
    .then((laraez) => console.log("user created", laraez));
prisma.user.findMany({}).then((allUsers) => console.log(allUsers));
// prisma.$disconnect();
// prisma.user
//   .findFirst({ where: { id: "user-0001" } })
//   .then((user) => console.log(user));
/*

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({}); // Limpia la tabla antes de poblar

  await prisma.user.create({
    data: {
      id: "user-0003",
      name: "Ed U",
      email: "edu@mail.com",
      username: "edu",
      password: "123123123",
    },
  });
  console.log("user created: user-0003");

  await prisma.user.create({
    data: {
      id: "user-0004",
      name: "Luciano",
      email: "luciano@mail.com",
      username: "luciano",
      password: "123123123",
    },
  });
  console.log("user created: user-0004");

  const allUsers = await prisma.user.findMany({});
  console.log(allUsers);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

*/
/*

try {
  await prisma.user.create({
    data: {
      id: "user-0007",
      name: "Laura Sanchez",
      email: "lsanchez@mail.com",
      username: "laraez",
      password: "123123123",
    },
  });
  console.log("user created");
} catch (error) {
  console.error(error);
}

try {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
} catch (error) {
  console.error(error);
}

*/
//# sourceMappingURL=populate.js.map