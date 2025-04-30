import { Router } from 'express';
import { useRoleService } from '../../services/index.js';

const roleRouter = Router();
const roleService = useRoleService();

roleRouter.get('/role', async (req, res) => {
    try {
        const roleList = await roleService.getRoleList();
        res.json(roleList);
    }
    catch (error) {
        console.error('Get role list error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

roleRouter.post('/role/menu', async (req, res) => {
    try {
        const { role } = req.body;
        const isValidRole = await roleService.isValidRole(role);

        if (!isValidRole) {
            return res.status(403).json({ message: `Invalid role: ${role}` });
        }

        const menus = await roleService.getRoleMenuList(role);
        res.json(menus);
    }
    catch (error) {
        console.error('Get role menu error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

roleRouter.post('/role/button', async (req, res) => {
    try {
        const { role } = req.body;
        const isValidRole = await roleService.isValidRole(role);

        if (!isValidRole) {
            return res.status(403).json({ message: `Invalid role: ${role}` });
        }

        const buttons = await roleService.getRoleButtonList(role);
        res.json(buttons);
    }
    catch (error) {
        console.error('Get role button error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

roleRouter.post('/role/delete', async (req, res) => {
    try {
        const { ids } = req.body;
        await roleService.deleteRole(ids);
        res.json({ message: 'Delete role success' });
    }
    catch (error) {
        console.error('Delete role error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

roleRouter.post('/role/add', async (req, res) => {
    try {
        const { info } = req.body;
        await roleService.addRole(info);
        res.json({ message: 'Add role success' });
    }
    catch (error) {
        console.error('Add role error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

roleRouter.post('/role/update', async (req, res) => {
    try {
        const { info } = req.body;
        await roleService.updateRole(info);
        res.json({ message: 'Update role success' });
    }
    catch (error) {
        console.error('Update role error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default roleRouter;