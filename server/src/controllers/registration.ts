import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import findUser from '../queries/findUser';
import registrationQuerie from '../queries/registrationQuerie';
// import { signupSchema } from '../../validation';
import { generateToken, CustomError } from '../utils';
import { ARRAY } from 'sequelize';

const registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, image } = req.body;
        const emailExisted: any = await findUser(email);

        if (emailExisted) {
            throw new CustomError(400, 'Try again, This Email is already Signed');
        }

        const hashed: string = await hash(req.body.password, 10);

        const userData = await registrationQuerie({ name, email, image }, hashed);

        const token = await generateToken({
            id: userData.dataValues.id,
            name: userData.dataValues.name,
            email: userData.dataValues.email,
        });
        res.status(201).cookie('token', token).json({ msg: 'Success' });
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            return next(new CustomError(400, 'Something went wrong, sign up again'));
        }
        return next(err);
    }
};

export default registration;