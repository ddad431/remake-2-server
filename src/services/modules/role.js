import pool from '../../database/db.js';

function useRoleService() {
    async function isValidRole(roleName) {
        const [rows] = await pool.execute(`
            SELECT * 
            FROM roles 
            WHERE name = ?`
            ,
            [roleName]
        );
        return rows.length > 0;
    }

    async function getRoleMenuList(roleName) {
        const [rows] = await pool.execute(`
            SELECT menus 
            FROM roles
            WHERE name = ?`
            ,
            [roleName]
        );
        if (rows.length === 0) return [];
        
        const menuIds = rows[0].menus;
        const [menus] = await pool.execute(`
            SELECT id, pid, name, type, path, component, title, icon 
            FROM menus 
            WHERE id IN (${menuIds.map(() => '?').join(',')})`
            ,
            [...menuIds]
        );
        
        return menus;
    }

    async function getRoleList() {
        const [rows] = await pool.execute(`
            SELECT id, name, description
            FROM roles`
        );
        return rows;
    }

    async function addRole(info) {
        const [result] = await pool.execute(`
            INSERT INTO roles (name, description, menus)
            VALUES (?, ?, ?)`
            ,
            [
                info.name,
                info.description || '',
                JSON.stringify(info.menus || [])
            ]
        );
        return result.insertId;
    }

    async function deleteRole(ids) {
        await pool.execute(`
            DELETE FROM roles 
            WHERE id IN (${ids.map(() => '?').join(',')})`
            ,
            ids
        );
    }

    async function updateRole(info) {
        await pool.execute(`
            UPDATE roles
            SET name = ?, description = ?, menus = ?
            WHERE id = ?`
            ,
            [
                info.name,
                info.description,
                JSON.stringify(info.menus || []),
                info.id
            ]
        );
    }

    return {
        isValidRole,
        getRoleMenuList,
        getRoleList,
        addRole,
        deleteRole,
        updateRole,
    };
}

export default useRoleService;