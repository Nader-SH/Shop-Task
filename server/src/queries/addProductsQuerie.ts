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
        console.log(data,"data");
        const product = await Products.create({
            ...data,
            userId
        });
        
    } catch (error) {
        throw new Error('Error creating Product in database');
    }
};

export default addProductsQuerie;
