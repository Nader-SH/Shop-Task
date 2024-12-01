import { Router } from 'express';
import {
    getAllProducts,
    registration,
    login,
    logout,
    addProducts
} from '../controllers';

import { auth } from '../middlewares';

const userRouter = Router();
userRouter.post('/logout', logout);
userRouter.post('/login', login);
userRouter.post('/registration', registration);
userRouter.get('/products', auth, getAllProducts);
userRouter.post('/addproducts', auth, addProducts);
userRouter.get('/getallproducts', auth, getAllProducts);



export default userRouter;