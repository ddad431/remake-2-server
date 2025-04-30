import { Router } from 'express'
import { useRoleService } from '../../services/index.js';

const permissionRouter = Router();
const roleService = useRoleService();

permissionRouter.post('/permission', async (req, res) => {
    try {
        const { role } = req.body;

        const menus = await roleService.getRoleMenuList(role);
        const buttons = await roleService.getRoleButtonList(role);

        res.json({ menus, buttons });
    }
    catch (error) {
        console.error('Permission error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default permissionRouter;