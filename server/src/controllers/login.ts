import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import findUser from '../queries/findUser';
import registrationQuerie from '../queries/registrationQuerie';
// import { signupSchema } from '../../validation';
import { generateToken, CustomError } from '../utils';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const emailExisted: any = await findUser(email);

        if (!emailExisted) {
            throw new CustomError(400, 'Try again, This Email is Not Signed');
        }

        const token = await generateToken({
            id: emailExisted.dataValues.id,
            name: emailExisted.dataValues.name,
            email: emailExisted.dataValues.email,
        });
        res.status(201).cookie('token', token).json({ msg: 'Success' , user : emailExisted.dataValues });
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            return next(new CustomError(400, 'Something went wrong, sign up again'));
        }
        return next(err);
    }
};

export default login;