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

    return {
        isValidUser,
        getUserInfo
    }
}

export default useUserService;
