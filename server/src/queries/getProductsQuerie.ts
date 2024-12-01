import {Products } from '../models';

const getProductsQuerie = async (page: number) => {
  const limit = 8;
  return Products.findAndCountAll({
    attributes: ['id', 'name'],
    offset: (page - 1) * limit,
    limit,
  });
};

export default getProductsQuerie;