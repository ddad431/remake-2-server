import fs from 'fs';
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;

function useTokenService() {
    function isValidToken(token) {
        try {
            jwt.verify(token, SECRET_KEY);
            return true;
        }
        catch (error) {
            console.error('Invalid token:', error.message);
            return false;
        }
    }

    function generateToken(userInfo) {
        const payload = userInfo;
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
        return token;
    }

    function decodeToken(token) {
        return jwt.decode(token);
    }

    return {
        isValidToken,
        generateToken,
        decodeToken
    };
}

export default useTokenService;
