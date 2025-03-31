import { Router } from 'express';
// sub modules
import userRouter from "./user.js";
import roleRouter from "./role.js";

const permissionRouter = Router();

permissionRouter.use('/permission', userRouter)
                .use('/permission', roleRouter);

export default permissionRouter;