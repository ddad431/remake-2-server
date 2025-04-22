import fs, { read } from 'fs';
import { readFile, writeFile, resolvePath } from '../../utils/fileHandler.js';

const menuFilePath = resolvePath('../data/menu.json');

if (!fs.existsSync(menuFilePath)) {
    fs.writeFileSync(menuFilePath, JSON.stringify([]));
}

function useMenuService() {
    function getMenuList() {
        const menus = readFile(menuFilePath);

        return menus;
    }

    function addMenu(info) {
        const menus = readFile(menuFilePath);
        const id = menus[menus.length-1].id + 1;

        menus.push({id, ...info});
        writeFile(menuFilePath, menus);
    }

    function updateMenu(info) {
        const menus = readFile(menuFilePath);
        const index = menus.findIndex(menu => menu.id === info.id)

        menus[index] = info;
        writeFile(menuFilePath, menus);
    }

    function deleteMenu(ids) {
        let menus = readFile(menuFilePath);

        menus = menus.filter(v => !ids.includes(v.id));
        writeFile(menuFilePath, menus);
    }

    return {
        getMenuList,
        addMenu,
        deleteMenu,
        updateMenu,
    }
}

export default useMenuService;

