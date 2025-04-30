import pool from '../../database/db.js';

function useUserService() {
    async function isValidUser({username, password}) {
        const [rows] = await pool.execute(`
            SELECT *
            FROM users
            WHERE username = ? AND password = ?`
            ,
            [username, password]
        );

        return rows.length > 0;
    }

    async function getUserInfo(username) {
        const [rows] = await pool.execute(`
            SELECT id, username, avator, gender, phone, enable, role
            FROM users
            WHERE username = ?`
            ,
            [username]
        );

        const info = Object.assign(rows[0], {enable: rows[0].enable === 1}) || {};
        return info;
    }

    async function getUserList() {
        const [rows] = await pool.execute(`
            SELECT id, username, avator, gender, phone, enable, role
            FROM users`
        );

        return rows.map(row => Object.assign(row, {enable: row.enable === 1})) || [];
    }

    async function addUser(info) {
        const avators = ["/images/avator-admin.png", "/images/avator-user.png"];
        const avator = avators[Math.round(Math.random())];
        const password = info?.username + '123';

        const [result] = await pool.execute(`
            INSERT INTO users (username, password, avator, gender, phone, enable, role)
            VALUES (?, ?, ?, ?, ?, ?, ?)`
            ,
            [
                info.username,
                password,
                avator,
                info.gender || 'man',
                info.phone || null,
                info.enable || true,
                info.role || 'user'
            ]
        );

        return result.insertId;
    }

    async function deleteUser(ids) {
        await pool.execute(`
            DELETE FROM users
            WHERE id IN (${ids.map(() => '?').join(',')})`
            ,
            ids
        );
    }

    async function updateUserInfo(info) {
        await pool.execute(`
            UPDATE users
            SET username = ?, gender = ?, phone = ?, enable = ?, role = ?
            WHERE id = ?`
            ,
            [
                info.username,
                info.gender,
                info.phone,
                info.enable,
                info.role,
                info.id
            ]
        );
    }

    return {
        isValidUser,
        getUserInfo,
        getUserList,
        addUser,
        deleteUser,
        updateUserInfo,
    }
}

export default useUserService;