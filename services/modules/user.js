import fs from 'fs';
import { readFile, writeFile, resolvePath } from '../../utils/fileHandler.js';

const usersFilePath = resolvePath('../data/user.json');

if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([]));
}

function useUserService() {
    function isValidUser({username, password}) {
        const users = readFile(usersFilePath);
        return users.some(user => user.username === username && user.password === password);
    }

    function getUserInfo(username) {
        const users = readFile(usersFilePath);
        const user = users.find(user => user.username === username);
        const { password, ...userInfo } = user;
        return userInfo;
    }

    function getUserList() {
        const users = readFile(usersFilePath);
        const userList = users.map(({password, ...userInfo}) =>  userInfo);

        return userList;
    }

    function addUser(info) {
        const users = readFile(usersFilePath);
        const id = users[users.length - 1].id + 1;
        const avators = [ "/images/avator-admin.png", "/images/avator-user.png", ];
        const avator = avators[Math.round(Math.random())];
        const password = info?.username + '123';

        users.push({id, avator, password, ...info});
        writeFile(usersFilePath, users);
    }

    function deleteUser(ids) {
        const users = readFile(usersFilePath);
        const userList = users.filter(user => !ids.includes(user.id));

        writeFile(usersFilePath, userList);
    }

    function updateUserInfo(info) {
        const users = readFile(usersFilePath);
        const user = users.find(value => value.id === info.id);

        Object.assign(user, info);
        writeFile(usersFilePath, users);
    }

    return {
        isValidUser,
        getUserInfo,
        getUserList,
        addUser,
        deleteUser,
        updateUserInfo,
    }
}

export default useUserService;
