import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { authMiddeleware, delayMiddleware } from './middlewares/index.js';
import router from './routes/index.js';
import initDatabase from './database/init.js';

const app = express();
const port = process.env.PORT || 3000;

// // 初始化数据库
// initDatabase().catch(error => {
//     console.error('Failed to initialize database:', error);
//     process.exit(1);
// });

// allow cross origin
app.use(cors());
// parse request body
app.use(express.json());
// set static files location
app.use(express.static('public'));

app.use(authMiddeleware);
app.use(delayMiddleware(500));

// router
app.use(router);

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})