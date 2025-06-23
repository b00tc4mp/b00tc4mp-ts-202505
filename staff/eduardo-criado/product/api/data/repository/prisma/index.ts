import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

try {
  //   const chema = await prisma.user.create({
  //     data: {
  //       name: "Chemita G",
  //       email: "chemag@mail.com",
  //       username: "chemita",
  //       password: "123123123",
  //     },
  //   });

  //   console.log("user created");

  const paco = await prisma.user.create({
    data: {
      name: "Paquito",
      email: "paquito@mail.com",
      username: "paquito",
      password: "123123123",
    },
  });

  console.log("user created");

  const allUsers = await prisma.user.findMany({});

  console.log(allUsers);
} catch (error) {
  console.error(error);
}
