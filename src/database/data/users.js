export async function createTable(pool) {
    await pool.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            avator VARCHAR(255),
            gender ENUM('man', 'woman') NOT NULL,
            phone VARCHAR(20),
            enable BOOLEAN DEFAULT TRUE,
            role VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )

    `);
}

export async function seed(pool) {
    // 清空表
    await pool.execute('TRUNCATE TABLE users');

    // 插入数据
    await pool.execute(`
        INSERT INTO users (id, username, password, avator, gender, phone, enable, role)
        VALUES
        (1, 'admin', '123456', '/images/avator-admin.png', 'man', 123456789, TRUE, 'admin'),
        (2, 'user',  '123456', '/images/avator-user.png', 'woman', 123456789, TRUE, 'user')
    `);
}