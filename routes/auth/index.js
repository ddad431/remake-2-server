import { Router } from 'express';
// sub modules
import loginRouter from "./login.js";

const authRouter = Router();

authRouter.use('/auth', loginRouter);

export default authRouter;
