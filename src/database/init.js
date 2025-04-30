import { fileURLToPath } from 'url';
import 'dotenv/config';
// modules
import pool from './db.js';
import * as users from './data/users.js';
import * as roles from './data/roles.js';
import * as menus from './data/menus.js';

async function initDatabase() {
    try {
        await users.createTable(pool);
        await roles.createTable(pool);
        await menus.createTable(pool);

        await menus.seed(pool);
        await roles.seed(pool);
        await users.seed(pool);

        console.log('Database initialized successfully');
    }
    catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

// 如果直接运行此文件，则执行初始化
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    initDatabase()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

export default initDatabase;