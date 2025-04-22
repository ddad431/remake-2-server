import { Router } from 'express';
import { useMenuService } from '../../services/index.js';

const menuRouter = Router();
const menuService = useMenuService();

menuRouter.get('/menu', (req, res) => {
    const menus = menuService.getMenuList();

    res.json(menus);
});

menuRouter.post('/menu/add', (req, res) => {
    const { info } = req.body;

    menuService.addMenu(info);
    res.send('add menu success.');
})

menuRouter.post('/menu/delete', (req, res) => {
    const { ids } = req.body;

    menuService.deleteMenu(ids);
    res.send('delete menu success.');
})

menuRouter.post('/menu/update', (req, res) => {
    const { info } = req.body;

    menuService.updateMenu(info);
    res.send('update menu success.');
})

export default menuRouter;