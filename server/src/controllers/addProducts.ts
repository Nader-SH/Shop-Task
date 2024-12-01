import { Request, Response, NextFunction } from 'express';
import addProductsQuerie from '../queries/addProductsQuerie';
import { CustomError } from '../utils';

const addProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, count, price, description, image } = req.body;
        const addProduct = await addProductsQuerie({ name, count, price, description, image }, req.user.id);        
        res.status(201).json({ msg: 'Add Success' });
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            return next(new CustomError(400, 'Something went wrong, sign up again'));
        }
        return next(err);
    }
};

export default addProducts;