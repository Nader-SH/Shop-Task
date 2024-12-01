import { Request, Response, NextFunction } from 'express';
import getProductsQuerie  from '../queries/getProductsQuerie';

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page = 1 } = req.query;
  try {
    const data = await getProductsQuerie(+page);
    res.json({
      data,
      msg: 'Success',
    });
  } catch (err: any) {
    next(err);
  }
};
export default getAllProducts;