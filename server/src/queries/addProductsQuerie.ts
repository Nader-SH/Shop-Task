import { Products } from '../models';

interface RegistrationData {
    name: string;
    count: number;
    price: number;
    description: string;
    image: string;
}

const  addProductsQuerie = async (data: RegistrationData , userId : number) => {
    try {
        const product = await Products.create({
            ...data,
            userId : userId
        });
        return product;
    } catch (error) {
        throw new Error('Error creating Product in database');
    }
};

export default addProductsQuerie;
