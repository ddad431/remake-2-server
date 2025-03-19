import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块的目录路径
const __dirname = path.dirname(__filename);

// 解析 tokens 文件路径
const tokensFilePath = path.resolve(__dirname, '../data/tokens.json');

// 初始化 tokens 文件（如果不存在）
if (!fs.existsSync(tokensFilePath)) {
    fs.writeFileSync(tokensFilePath, JSON.stringify([]));
}

export const readTokens = () => {
    try {
        const data = fs.readFileSync(tokensFilePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error reading tokens file:', error);
        return [];
    }
};

export const writeTokens = (tokens) => {
    try {
        fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2));
    }
    catch (error) {
        console.error('Error writing tokens file:', error);
    }
};
