import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { authMiddeleware, delayMiddleware } from './middlewares/index.js';
import router from './routes/index.js';

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

// router
app.use(router);

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})
