import fs from 'fs';
import { readFile, writeFile, resolvePath } from '../../utils/fileHandler.js';

const tokensFilePath = resolvePath('../data/token.json');

if (!fs.existsSync(tokensFilePath)) {
    fs.writeFileSync(tokensFilePath, JSON.stringify([]));
}

function useTokenService() {
    function isValidToken(token) {
        const tokens = readFile(tokensFilePath);
        return tokens.some(t => t.token === token);
    }

    function generateToken(userInfo) {
        const username = userInfo?.username;
        const tokens = readFile(tokensFilePath);
        const token = `fake-jwt-token-${username}-${Math.random().toString().slice(-2)}`;
        const isExistToken = tokens.some(t => t.username === username);

        // 如果有 token，覆盖之前的 token
        if (isExistToken) {
            const index = tokens.findIndex(t => t.username === username);
            tokens[index] = { username: userInfo?.username, token };
        }
        else {
            tokens.push({ username, token });
        }
        writeFile(tokensFilePath, tokens);

        return token;
    }

    return {
        isValidToken,
        generateToken,
    };
}

export default useTokenService;
