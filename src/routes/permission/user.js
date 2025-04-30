import { Router } from 'express';
import { useUserService } from '../../services/index.js';

const userRouter = Router();
const userService = useUserService();

userRouter.get('/user', async (req, res) => {
    try {
        const userList = await userService.getUserList();
        res.json(userList);
    }
    catch (error) {
        console.error('Get user list error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

userRouter.post('/user/delete', async (req, res) => {
    try {
        const { ids } = req.body;
        await userService.deleteUser(ids);
        res.json({ message: 'Delete user success' });
    }
    catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

userRouter.post('/user/add', async (req, res) => {
    try {
        const { info } = req.body;
        await userService.addUser(info);
        res.json({ message: 'Add user success' });
    }
    catch (error) {
        console.error('Add user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

userRouter.post('/user/update', async (req, res) => {
    try {
        const { info } = req.body;
        await userService.updateUserInfo(info);
        res.json({ message: 'Update user success' });
    }
    catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default userRouter;