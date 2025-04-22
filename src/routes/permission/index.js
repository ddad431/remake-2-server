import { Router } from 'express';
// sub modules
import userRouter from "./user.js";
import roleRouter from "./role.js";
import menuRouter from "./menu.js";

const permissionRouter = Router();

permissionRouter.use('/permission', userRouter)
                .use('/permission', roleRouter)
                .use('/permission', menuRouter);

export default permissionRouter;