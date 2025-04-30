import pool from '../../database/db.js';

function useMenuService() {
    async function getMenuList() {
        const [rows] = await pool.execute(`
            SELECT id, pid, name, type, path, component, title, icon
            FROM menus 
            ORDER BY id`
        );
        return rows;
    }

    async function addMenu(info) {
        const [result] = await pool.execute(`
            INSERT INTO menus (name, path, component, title, icon, type, pid)
            VALUES (?, ?, ?, ?, ?, ?, ?)`
            ,
            [
                info.name,
                info.path || '',
                info.component || '',
                info.title,
                info.icon || '',
                info.type,
                info.pid,
            ]
        );
        return result.insertId;
    }

    async function deleteMenu(ids) {
        await pool.execute(`
            DELETE FROM menus 
            WHERE id IN (${ids.map(() => '?').join(',')})`
            ,
            ids
        );
    }

    async function updateMenu(info) {
        await pool.execute(`
            UPDATE menus
            SET name = ?, path = ?, component = ?, title = ?, icon = ?, type = ?, pid = ?
            WHERE id = ?`
            ,
            [
                info.name,
                info.path || '',
                info.component || '',
                info.title,
                info.icon || '',
                info.type,
                info.pid,
                info.id
            ]
        );
    }

    return {
        getMenuList,
        addMenu,
        deleteMenu,
        updateMenu,
    };
}

export default useMenuService;