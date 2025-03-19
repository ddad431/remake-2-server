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

    return {
        isValidRole,
        getRoleMenu
    };
}

export default useRoleService;