import { Router } from 'express';
// sub modules
import loginRouter from "./login.js";
import permissionRouter from './permission.js';

const authRouter = Router();

authRouter.use('/auth', loginRouter)
          .use('/auth', permissionRouter);

export default authRouter;