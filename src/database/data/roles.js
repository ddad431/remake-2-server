export async function createTable(pool) {
    await pool.execute(`
        CREATE TABLE IF NOT EXISTS roles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE,
            description VARCHAR(255),
            menus JSON,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
}

export async function seed(pool) {
    // 清空表
    await pool.execute('TRUNCATE TABLE roles');

    // 插入数据
    await pool.execute(`
        INSERT INTO roles (name, description, menus) VALUES
        ('admin', '系统管理员', JSON_ARRAY(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17)),
        ('user', '普通用户', JSON_ARRAY(1))
    `);
}