import { Router } from 'express';
import { useTokenService, useUserService } from '../../services/index.js';

const loginRouter = Router();
const userService = useUserService();
const tokenService = useTokenService();

loginRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const isValidUser = await userService.isValidUser({ username, password });
        if (!isValidUser) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const userInfo = await userService.getUserInfo(username);
        const token = tokenService.generateToken(userInfo);

        res.json({ token, userInfo });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default loginRouter;