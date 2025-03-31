import { Router } from 'express';
import { useRoleService } from '../../services/index.js';

const roleRouter = Router();
const roleService = useRoleService();

roleRouter.get('/role', (req, res) => {
    const roleList = roleService.getRoleList();

    res.json(roleList);
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