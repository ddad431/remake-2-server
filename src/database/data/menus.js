export async function createTable(pool) {
    await pool.execute(`
        CREATE TABLE IF NOT EXISTS menus (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pid INT,
            name VARCHAR(50) NOT NULL,
            type enum('directory', 'menu', 'button') NOT NULL,
            path VARCHAR(255),
            component VARCHAR(255),
            title VARCHAR(50),
            icon VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (pid) REFERENCES menus(id) ON DELETE SET NULL
        )
    `);
}

export async function seed(pool) {
    // 清空表
    await pool.execute('TRUNCATE TABLE menus');

    // 插入数据
    await pool.execute(`
        INSERT INTO menus (id, pid, name, type, path, component, title, icon) VALUES
        (1, NULL, 'dashboard', 'menu', '/dashboard', 'DashboardComponent', '数据面板', 'icon-dashboard'),
        (2, NULL, 'system', 'directory', '/system', '', '系统管理', 'icon-system'),
        (3, 2, 'user', 'menu', 'user', 'SystemUserComponent', '用户管理', NULL),
        (4, 2, 'role', 'menu', 'role', 'SystemRoleComponent', '角色管理', NULL),
        (5, 2, 'menu', 'menu', 'menu', 'SystemMenuComponent', '菜单管理', NULL),
        (6, 3, 'add', 'button', NULL, NULL, '新增', NULL),
        (7, 3, 'delete', 'button', NULL, NULL, '删除', NULL),
        (8, 3, 'edit', 'button', NULL, NULL, '编辑', NULL),
        (9, 3, 'export', 'button', NULL, NULL, '导出', NULL),
        (10, 4, 'add', 'button', NULL, NULL, '新增', NULL),
        (11, 4, 'delete', 'button', NULL, NULL, '删除', NULL),
        (12, 4, 'edit', 'button', NULL, NULL, '编辑', NULL),
        (13, 4, 'export', 'button', NULL, NULL, '导出', NULL),
        (14, 5, 'add', 'button', NULL, NULL, '新增', NULL),
        (15, 5, 'delete', 'button', NULL, NULL, '删除', NULL),
        (16, 5, 'edit', 'button', NULL, NULL, '编辑', NULL),
        (17, 5, 'export', 'button', NULL, NULL, '导出', NULL)
    `);
}