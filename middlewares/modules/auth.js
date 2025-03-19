import { useTokenService } from "../../services/index.js";

const tokenService = useTokenService();

const whiteList = [
    '/auth/login',
    '/public',
];

function authMiddeleware(req, res, next) {
    const isRequireAuth = !whiteList.some(path => req.path.startsWith(path));
    if (!isRequireAuth) {
        return next();
    }

    const token = req.headers?.authorization?.replace('Bearer ', '');
    if (!token || !tokenService.isValidToken(token)) {
        return res.status(401).json({ message: 'Invalid or missing token' });
    }

    // 解码 Token 并附加到请求对象
    // req.user = tokenService.decodeToken(token);
    next();
}

export default authMiddeleware;