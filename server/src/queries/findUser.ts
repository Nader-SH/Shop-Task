import { Users } from '../models';

const findUser = async (email: string) => {
    try {
        const user = await Users.findOne({
            where: {
                email: email,
            },
        });

        return user;
    } catch (error) {
        console.error('Error finding user:', error);
        throw new Error('Database query failed');
    }
};

export default findUser;
