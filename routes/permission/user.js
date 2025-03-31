import { Router } from 'express';
import { useUserService } from '../../services/index.js';

const userRouter = Router();
const userService = useUserService();

userRouter.get('/user', (req, res) => {
    const userList = userService.getUserList();

    res.json(userList);
})

userRouter.post('/user/delete', (req, res) => {
    const { ids } = req.body;

    userService.deleteUser(ids);
    res.send('delete user success.');
})

userRouter.post('/user/add', (req, res) => {
    const { info } = req.body;

    userService.addUser(info);
    res.send('add user success.');
})

userRouter.post('/user/update', (req, res) => {
    const { info } = req.body;

    userService.updateUserInfo(info);
    res.send('upadte user success.');
})

export default userRouter;