import { Router } from 'express';
import { useRoleService } from '../../services/index.js';

const roleRouter = Router();
const roleService = useRoleService();

roleRouter.get('/role', (req, res) => {
    const roleList = roleService.getRoleList();

    res.json(roleList);
})

roleRouter.post('/role/menu', (req, res) => {
    const { role } = req.body;

    const isValidRole = roleService.isValidRole(role);
    if (!isValidRole) {
        return res.status(403).send(`Error query: ${role}`);
    }

    const menus = roleService.getRoleMenuList(role);
    res.json(menus);
})

roleRouter.post('/role/button', (req, res) => {
    const { role } = req.body;
    const isValidRole = roleService.isValidRole(role);

    if (!isValidRole) {
        return res.status(403).send(`Error query: ${role}`);
    }

    const buttons = roleService.getRoleButtonList(role);
    res.json(buttons);
})

roleRouter.post('/role/delete', (req, res) => {
    const { ids } = req.body;

    roleService.deleteRole(ids);
    res.send('delete role success.');
});

roleRouter.post('/role/add', (req, res) => {
    const { info } = req.body;

    roleService.addRole(info);
    res.send('add role success.');
})

roleRouter.post('/role/update', (req, res) => {
    const { info } = req.body;

    roleService.updateRole(info);
    res.send('update role info success.');
})

export default roleRouter;