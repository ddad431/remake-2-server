import { Router } from 'express'
// sub module
import authRouter from  './auth/index.js'
import permissionRouter from './permission/index.js';

const router = Router();

router.use('/', authRouter)
      .use('/', permissionRouter);

export default router;