import express from 'express';
import cors from 'cors';
import { readTokens, writeTokens } from './utils/tokens.js';

const app = express();
const port = 3000;

// 使用 cors 中间件，用于解决跨域问题
app.use(cors());

// 使用 express.json 内置中间件，用于解析请求体
app.use(express.json());

// 使用 express.static 内置中间件，用于提供静态文件
app.use(express.static('public'));

app.get("/", (_, res) => {
    res.send('Hello world!');
});

const users = [
    {
        id: 1,
        username: 'admin',
        password: '123456',
        phone: 1111111111,
        avator: '/images/avator-admin.png',
        role: 'admin'
    },
    {
        id: 2,
        username: 'user',
        password: '123456',
        phone: 2222222222,
        avator: '/images/avator-user.png',
        role: 'user'
    }
];

app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    // 1. 校验用户名与密码
    const isValid = users.some(user => user.username === username && user.password === password);
    if (!isValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 2. 获取用户信息
    const user = users.find(user => user.username === username);
    const { password: _, ...userInfo } = user;

    // 3. 生成测试 token
    let tokens = readTokens();
    let token = '';
    if (tokens.some(token => token.username === username)) {
        token = tokens.find(token => token.username === username).token;
    }
    else {
        token = `fake-token-${username}`;
        tokens.push({ username, token });
        writeTokens(tokens); // 保存到文件
    }

    // 4. 返回 token 与用户信息
    res.json({ token, userInfo });
});

const roles = [
    {
        role: 'admin',
        menus: [
            {
                type: 'menu',
                name: 'dashboard',
                path: '/dashboard',
                component: 'DashboardComponent',
                meta: {
                    title: '数据面板',
                    icon: 'el-icon-dashboard',
                }
            },
            {
                type: 'directory',
                name: 'system',
                path: '/system',
                component: '',
                meta: {
                    title: '系统管理',
                    icon: 'el-icon-system',
                },
                children: [
                    {
                        type: 'menu',
                        name: 'user',
                        path: 'user',
                        component: 'SystemUserComponent',
                        meta: {
                            title: '用户管理',
                        },
                    },
                    {
                        type: 'menu',
                        name: 'role',
                        path: 'role',
                        component: 'SystemRoleComponent',
                        meta: {
                            title: '角色管理',
                        },
                    },
                    {
                        type: 'menu',
                        name: 'menu',
                        path: 'menu',
                        component: 'SystemMenuComponent',
                        meta: {
                            title: '菜单管理',
                        }
                    },
                ]
            },
        ],
    },
    {
        role: 'user',
        menus: [
            {
                type: 'menu',
                name: 'dashboard',
                path: '/dashboard',
                component: 'DashboardComponent',
                meta: {
                    title: '数据面板',
                    icon: 'el-icon-dashboard',
                }
            },
        ],
    }
];

app.post('/auth/menu', (req, res) => {
    // token 验证
    const tokens = readTokens();
    const token = req.headers?.authorization.replace('Bearer ', '');
    if (!tokens.some(t => t.token === token)) {
        return res.status(401).send('Invalid token');
    }

    const { role } = req.body;
    if (!role || !roles.some(r => r.role === role)) {
        return res.status(403).send(`Error query: ${role}`);
    }

    const menus = roles.find(r => r.role === role).menus;
    res.json(menus);
});

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})