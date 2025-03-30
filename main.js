import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { authMiddeleware, delayMiddleware } from './middlewares/index.js';
import { useTokenService, useUserService, useRoleService, useMenuService } from './services/index.js'

const app = express();
const port = process.env.PORT;

// 使用 cors 中间件，用于解决跨域问题
app.use(cors());

// 使用 express.json 内置中间件，用于解析请求体
app.use(express.json());

// 使用 express.static 内置中间件，用于提供静态文件
app.use(express.static('public'));

app.use(authMiddeleware);
app.use(delayMiddleware(500));

app.get("/", (_, res) => {
    res.send('Hello world!');
});

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    const isValidUser = useUserService().isValidUser({ username, password });
    if (!isValidUser) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const userInfo = useUserService().getUserInfo(username);
    const token = useTokenService().generateToken(userInfo);

    res.json({ token, userInfo });
});

app.post('/auth/menu', (req, res) => {
    const { role } = req.body;

    const isValidRole = useRoleService().isValidRole(role);
    if (!isValidRole) {
        return res.status(403).send(`Error query: ${role}`);
    }

    const menus = useRoleService().getRoleMenu(role);
    res.json(menus);
});

app.get('/permission/user', (req, res) => {
    const data = useUserService().getUserList();
    res.json(data);
})

app.post('/permission/user/delete', (req, res) => {
    const { ids } = req.body;
    const data = useUserService().deleteUser(ids);
    res.json('delete user success.');
})

app.post('/permission/user/add', (req, res) => {
    const { info } = req.body;
    useUserService().addUser(info);
    res.send('add user success.');
})

app.post('/permission/user/update', (req, res) => {
    const { info } = req.body;
    console.log('req body:', info);
    useUserService().updateUserInfo(info);
    res.send('upadte user success.');
})

app.get('/permission/role', (req, res) => {
    const roleList = useRoleService().getRoleList();

    res.json(roleList);
})

app.post('/permission/role/delete', (req, res) => {
    const { ids } = req.body;

    useRoleService().deleteRole(ids);
    res.send('delete role success.');
});

app.post('/permission/role/add', (req, res) => {
    const { info } = req.body;

    useRoleService().addRole(info);
    res.send('add role success.');
})

app.post('/permission/role/update', (req, res) => {
    const { info } = req.body;

    useRoleService().updateRole(info);
    res.send('update role info success.');
})

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})
