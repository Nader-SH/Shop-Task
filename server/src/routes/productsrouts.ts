import { Router } from 'express';
import {
    getAllProducts,
    registration,
    login,
    logout,
    addProducts
} from '../controllers';
import multer from "multer";
const upload = multer({ dest: "uploadsStory/" });
import { auth } from '../middlewares';

const userRouter = Router();
userRouter.post('/logout', logout);
userRouter.post('/login', login);
userRouter.post('/registration', upload.single("image"),registration);
userRouter.get('/products', auth, getAllProducts);
userRouter.post('/addproduct', auth, addProducts);
userRouter.get('/products', auth, getAllProducts);



export default userRouter;