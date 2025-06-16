import fs from "fs/promises";
export const UserRepository = {
    save(user) {
        return (fs
            .readFile("./data/repository/fs/users.json", "utf8")
            // TODO manage system errors (catch)
            .then((json) => {
            const users = JSON.parse(json);
            users.push(user);
            json = JSON.stringify(users);
            return fs.writeFile("./data/repository/fs/users.json", json);
            // TODO manage system errors (catch)
        }));
    },
    findByUsername(username) {
        return fs
            .readFile("./data/repository/fs/users.json", "utf8")
            .then((json) => {
            const users = JSON.parse(json);
            const user = users.find((user) => user.username === username);
            if (!user)
                return null;
            return user;
        });
    },
    findById(id) {
        return fs
            .readFile("./data/repository/fs/users.json", "utf8")
            .then((json) => {
            const users = JSON.parse(json);
            const user = users.find((user) => user.id === id);
            if (!user)
                return null;
            return user;
        });
    },
};
//# sourceMappingURL=UserRepository.js.map