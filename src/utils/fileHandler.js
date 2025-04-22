import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const readFile = (filepath) => {
    if (!fs.existsSync(filepath)) {
        throw new Error(`File not found: ${filepath}`);
    }

    try {
        const data = fs.readFileSync(filepath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
}

export const writeFile = (filepath, data) => {
    if (!fs.existsSync(filepath)) {
        throw new Error(`File not found: ${absolutePath}`);
    }
    try {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing tokens file:', error);
        return [];
    }
};

export const resolvePath = (relativePath) => {
    // 获取当前文件的目录路径
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // 解析为绝对路径
    return path.resolve(__dirname, relativePath);
};