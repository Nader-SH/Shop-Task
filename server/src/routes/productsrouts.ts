import { Router } from 'express';
import {
    getAllProducts
} from '../controllers';
import { auth } from '../middlewares';

const userRouter = Router();

userRouter.get('/products', auth, getAllProducts);


export default userRouter;