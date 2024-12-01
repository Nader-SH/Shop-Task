import { Users } from '../models';

interface RegistrationData {
    name: string;
    email: string;
    image: string;
}

const registrationQuerie = async (data: RegistrationData, hashed: string) => {
    try {
        const user = await Users.create({
            ...data,
            password: hashed,
        });

        return user;
    } catch (error) {
        throw new Error('Error creating user in database');
    }
};

export default registrationQuerie;
