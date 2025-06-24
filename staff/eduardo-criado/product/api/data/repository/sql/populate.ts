// import { PrismaClient, User } from "@prisma/client";

// const prisma = new PrismaClient();

// try {
//   //   const chema = await prisma.user.create({
//   //     data: {
//   //       name: "Chemita G",
//   //       email: "chemag@mail.com",
//   //       username: "chemita",
//   //       password: "123123123",
//   //     },
//   //   });

//   //   console.log("user created");

//   const paco = await prisma.user.create({
//     data: {
//       name: "Paquito",
//       email: "paquito@mail.com",
//       username: "paquito",
//       password: "123123123",
//     },
//   });

//   console.log("user created");

//   const allUsers = await prisma.user.findMany({});

//   console.log(allUsers);
// } catch (error) {
//   console.error(error);
// }

import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

// prisma.user
//   .create({
//     data: {
//       id: "user-0001",
//       name: "Ed U",
//       email: "edu@mail.com",
//       username: "edu",
//       password: "123123123",
//     },
//   })
//   .then((edu) => console.log("user created", edu));

// prisma.user
//   .create({
//     data: {
//       id: "user-0002",
//       name: "Man U",
//       email: "manu@mail.com",
//       username: "manu",
//       password: "123123123",
//     },
//   })
//   .then((manu) => console.log("user created", manu));

prisma.user.findMany({}).then((allUsers) => console.log(allUsers));

// prisma.user
//   .findFirst({ where: { id: "user-0001" } })
//   .then((user) => console.log(user));
