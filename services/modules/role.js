import fs from 'fs';
import { readFile, writeFile, resolvePath } from '../../utils/fileHandler.js';

const rolesFilePath = resolvePath('../data/role.json');

if (!fs.existsSync(rolesFilePath)) {
    fs.writeFileSync(rolesFilePath, JSON.stringify([]));
}

function useRoleService() {
    function isValidRole(roleName) {
        const roles = readFile(rolesFilePath);
        return roles.some(r => r.name === roleName);
    }

    function getRoleMenu(roleName) {
        const roles = readFile(rolesFilePath);
        const menus = roles.find(r => r.name === roleName).menus;
        return menus;
    }

    function getRoleList() {
        const roles = readFile(rolesFilePath);
        const roleList = roles.map(({menus, ...info}) => info);

        return roleList;
    }

    function addRole(info) {
        const roles = readFile(rolesFilePath);
        const id = roles.length > 0 ? roles[roles.length-1].id + 1 : 1;

        roles.push({id, ...info});
        writeFile(rolesFilePath, roles);
    }

    function deleteRole(ids) {
        const roles = readFile(rolesFilePath);
        const roleList = roles.filter(role => !ids.includes(role.id));

        writeFile(rolesFilePath, roleList);
    }

    function updateRole(info) {
        const roles = readFile(rolesFilePath);
        const roleId = roles.findIndex(role => role.id === info.id);

        roles[roleId] = info;
        writeFile(rolesFilePath, roles);
    }

    return {
        isValidRole,
        getRoleMenu,
        getRoleList,
        addRole,
        deleteRole,
        updateRole,
    };
}

export default useRoleService;