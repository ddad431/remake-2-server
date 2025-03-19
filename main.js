import express from 'express';
import cors from 'cors';
import { authMiddeleware } from './middlewares/index.js';
import { useTokenService, useUserService, useRoleService } from './services/index.js'

const app = express();
const port = 3000;

// 使用 cors 中间件，用于解决跨域问题
app.use(cors());

// 使用 express.json 内置中间件，用于解析请求体
app.use(express.json());

// 使用 express.static 内置中间件，用于提供静态文件
app.use(express.static('public'));

app.use(authMiddeleware);

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

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})
