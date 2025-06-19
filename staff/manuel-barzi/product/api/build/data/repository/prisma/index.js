import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
try {
    const edu = await prisma.user.create({
        data: {
            name: 'Ed U',
            email: 'edu@mail.com',
            username: 'edu',
            password: '123123123'
        }
    });
    console.log('user created');
    // const manu = await prisma.user.create({
    //     data: {
    //         name: 'Man U',
    //         email: 'manu@mail.com',
    //         username: 'manu',
    //         password: '123123123'
    //     }
    // })
    // console.log('user created')
    // const allUsers = await prisma.user.findMany({})
    // console.log(allUsers)
}
catch (error) {
    console.error(error);
}
//# sourceMappingURL=index.js.map