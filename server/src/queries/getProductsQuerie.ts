import {Products } from '../models';

const getProductsQuerie = async (page: number) => {
  const limit = 8;
  return Products.findAndCountAll({
    offset: (page - 1) * limit,
    limit,
    order: [["createdAt", "DESC"]],
  });
};

export default getProductsQuerie;