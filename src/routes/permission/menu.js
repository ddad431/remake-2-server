import { Router } from 'express';
import { useMenuService } from '../../services/index.js';

const menuRouter = Router();
const menuService = useMenuService();

menuRouter.get('/menu', async (req, res) => {
    try {
        const menus = await menuService.getMenuList();
        res.json(menus);
    }
    catch (error) {
        console.error('Get menu list error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

menuRouter.post('/menu/add', async (req, res) => {
    try {
        const { info } = req.body;
        await menuService.addMenu(info);
        res.json({ message: 'Add menu success' });
    }
    catch (error) {
        console.error('Add menu error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

menuRouter.post('/menu/delete', async (req, res) => {
    try {
        const { ids } = req.body;
        await menuService.deleteMenu(ids);
        res.json({ message: 'Delete menu success' });
    }
    catch (error) {
        console.error('Delete menu error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

menuRouter.post('/menu/update', async (req, res) => {
    try {
        const { info } = req.body;
        await menuService.updateMenu(info);
        res.json({ message: 'Update menu success' });
    }
    catch (error) {
        console.error('Update menu error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default menuRouter;