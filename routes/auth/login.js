import { Router } from 'express';
import { useRoleService, useTokenService, useUserService } from '../../services/index.js';

const loginRouter = Router();
const userService = useUserService();
const roleService = useRoleService();
const tokenService = useTokenService();

loginRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    const isValidUser = userService.isValidUser({ username, password });
    if (!isValidUser) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const userInfo = userService.getUserInfo(username);
    const token = tokenService.generateToken(userInfo);

    res.json({ token, userInfo });
});

export default loginRouter;