import express from 'express'
import cors from 'cors'

const app = express();
const port = 3000;

// 使用 cors 中间件，用于解决跨域问题
app.use(cors());

// 使用 express.json 内置中间件，用于解析请求体
app.use(express.json());

// 使用 express.static 内置中间件，用于提供静态文件
app.use(express.static('public'))

app.get("/", (_, res) => {
    res.send('Hello world!');
})

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

const tokens = [
]

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
    let token = '';
    if (tokens.some(token => token.username === username)) {
        token = tokens.find(token => token.username === username).token;
    }
    else {
        token = `fake-token-${username}`;
        tokens.push({ username, token });
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
                    title: 'Dashboard',
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
                    title: 'Dashboard',
                    icon: 'el-icon-dashboard',
                }
            },
        ],
    }
];

app.post('/auth/menu', (req, res) => {
    // token 验证
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

















// app.post('/api/route', (req, res) => {
//     const { role } = req.body;
//     const roles = [ 'user', 'admin' ];

//     if (!role || !roles.includes(role)) {
//         return res.status(403).send(`Error query: ${role}`);
//     }

//     // component 两种方案
//     // 1. 后端传回 component 名称，前端维护一个组件名-组件路径表
//     // 2. 后端不传 component。前端根据 path 以及 path 相关的文件目录约定自动生成。
//     //      - Permission/index.vue
//     //      - Permission/User/index.vue
//     //
//     // [solve]
//     //  - 第一种好一点。可能前端依赖于后端给的 component 名称，但是将来要是修
//     //    改的话，只需要修改组件名-组件路径表中的组件名就好了。
//     //  - 对于第二种，其严重依赖于后端给的 path 地址，假如 path 更改了，那前端还
//     //    得改文件夹名称。对应的，你文件路径改了，那就不能用了。
//     res.json([
//         { id: 1, pid: 0, path: '/dashboard', name: 'Dashboard', title: 'Dashboard', component: 'DashboardComponent', },
//         { id: 2, pid: 0, path: '/permission', name: 'Permission', title: 'Privilege', component: 'PermissionComponent', },
//         { id: 3, pid: 2, path: 'user', name: 'UserPermission', title: 'user', component: 'UserPermissionComponent'},
//         { id: 4, pid: 2, path: 'role', name: 'RolePermission', title: 'role', component: 'RolePermissionComponent'},
//         { id: 5, pid: 2, path: 'menu', name: 'MenuPermission', title: 'menu', component: 'MenuPermissionComponent'},
//     ])
// })

// app.get('/api/permission/user', (req, res) => {
//     res.json([
//         { id: 1, date: '2016-05-03', name: 'Aom', gender: "man", address: 'No. 189, Grove St, Los Angeles', },
//         { id: 2, date: '2016-05-02', name: 'Aom', gender: "woman", address: 'No. 189, Grove St, Los Angeles', },
//         { id: 3, date: '2016-05-04', name: 'Bom', gender: "man", address: 'No. 189, Grove St, Los Angeles', },
//         { id: 4, date: '2016-05-01', name: 'Com', gender: "man", address: 'No. 189, Grove St, Los Angeles', },
//         { id: 5, date: '2016-05-03', name: 'Dom', gender: "woman", address: 'No. 189, Grove St, Los Angeles', },
//         { id: 6, date: '2016-05-02', name: 'Eom', gender: "man", address: 'No. 189, Grove St, Los Angeles', },
//     ])
// })
//