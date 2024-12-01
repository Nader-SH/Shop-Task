import { Router } from 'express';
import userRouter from "./productsrouts";

const router = Router();

router.use(userRouter);

export default router;