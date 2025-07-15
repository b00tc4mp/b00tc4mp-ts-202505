import fs from "fs/promises";
import { SystemError } from "../../../logic/errors.js";
const { FS_USERS = "./data/repository/fs/users.json" } = process.env;
export const UserRepository = {
    // save(user) {
    //   return fs
    //     .readFile(FS_USERS, "utf8")
    //     .then((json) => {
    //       console.log("FS_USERS contents:", json);
    //       try {
    //         const users = JSON.parse(json);
    //         const exists = users.some(
    //           (_user: IUserData) =>
    //             _user.email === user.email || _user.username === user.username
    //         );
    //         if (exists) throw new Error("user data exists");
    //         users.push(user);
    //         json = JSON.stringify(users);
    //         return fs.writeFile(FS_USERS, json).catch((error) => {
    //           throw new SystemError("Error writing users file: " + error.message);
    //         });
    //       } catch (error) {
    //         console.error("Error parsing FS_USERS:", error);
    //         throw error;
    //       }
    //     })
    //     .catch((error) => {
    //       throw new SystemError("Error reading users file: " + error.message);
    //     });
    // },
    save(user) {
        return fs
            .readFile(FS_USERS, "utf8")
            .catch((error) => {
            throw new SystemError("Error reading users file: " + error.message);
        })
            .then((json) => {
            // console.log("Contenido JSON:", json);
            const users = JSON.parse(json);
            const exists = users.some((_user) => _user.email === user.email || _user.username === user.username);
            if (exists)
                throw new Error("user data exists");
            users.push(user);
            json = JSON.stringify(users);
            return fs.writeFile(FS_USERS, json).catch((error) => {
                throw new SystemError("Error writing users file: " + error.message);
            });
        });
    },
    findByUsername(username) {
        return fs
            .readFile(FS_USERS, "utf8")
            .catch((error) => {
            throw new SystemError("Error reading users file: " + error.message);
        })
            .then((json) => {
            const users = JSON.parse(json);
            const user = users.find((user) => user.username === username);
            if (user)
                return user;
            return null;
        });
    },
    findById(id) {
        return fs
            .readFile(FS_USERS, "utf8")
            .catch((error) => {
            throw new SystemError("Error reading users file: " + error.message);
        })
            .then((json) => {
            const users = JSON.parse(json);
            const user = users.find((user) => user.id === id);
            if (user)
                return user;
            return null;
        });
    },
    removeAll() {
        return fs.writeFile(FS_USERS, "[]").catch((error) => {
            throw new SystemError("Error clearing users file: " + error.message);
        });
    },
    generateId() {
        return Number((Date.now() + Math.random()).toString().replace(".", "")).toString(36);
    },
    filter(criteria, sort, page) {
        // TODO validate criteria, sort, page (q sean objetos con las propiedades correctas)
        return fs
            .readFile(FS_USERS, "utf8")
            .catch((error) => {
            throw new SystemError("Error reading users file: " + error.message);
        })
            .then((json) => {
            let users = JSON.parse(json);
            users = users.filter((user) => Object.entries(criteria).every(([key, value]) => user[key] === value));
            const key = Object.keys(sort)[0];
            if (key) {
                users = users.sort((a, b) => {
                    const aValue = a[key];
                    const bValue = b[key];
                    return sort[key] === 1
                        ? aValue > bValue
                            ? 1
                            : -1
                        : aValue < bValue
                            ? 1
                            : -1;
                });
            }
            /*
            key: name
            sort[key] === -1
            aValue: Tomas
            bValue : Maria
            asc(A-Z)
            desc(Z-A)
            */
            const startIndex = (page.page - 1) * page.size;
            const endIndex = startIndex + page.size;
            users = users.slice(startIndex, endIndex);
            /*
    
            este ej es suponinedo q el indice de los arrays no empezara en 0 sino en 1
    
            users.length === 37
    
            page.page == 11
    
            page.size == 3
    
            33
    
            3 usuarios x pagina x 11 paginas = 33 (3X11)
    
            startIndex pag 11 es 33 el endIndex al ser 3 usuarios x pagina deria 36
    
            33 + 3
    
            users.slice(33, 36) indices arrays empezando en 1
            users.slice(32, 35) indices arrays empezando en 0
    
            */
            return users;
        });
    },
};
//# sourceMappingURL=UserRepository.js.map