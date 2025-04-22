import { Router } from 'express'
import { useRoleService } from '../../services/index.js';

const permissionRouter = Router();
const roleService = useRoleService();

permissionRouter.post('/permission', (req, res) => {
    const { role } = req.body;

    const menus = roleService.getRoleMenuList(role);
    const buttons = roleService.getRoleButtonList(role);

    res.json({ menus, buttons })
})

export default permissionRouter;