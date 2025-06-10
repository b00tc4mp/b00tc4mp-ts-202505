import fs from "fs/promises";
export const UserRepository = {
    save(user) {
        return fs.readFile("./data/repository/fs/users.json", "utf8")
            // TODO manage system errors (catch)
            .then(json => {
            const users = JSON.parse(json);
            users.push(user);
            json = JSON.stringify(users);
            return fs.writeFile("./data/repository/fs/users.json", json);
            // TODO manage system errors (catch)
        });
    },
    findByUsername(username) {
        // TODO implement me
        return Promise.resolve(null);
    },
    findById(id) {
        // TODO implement me
        return Promise.resolve(null);
    },
};
//# sourceMappingURL=UserRepository.js.map