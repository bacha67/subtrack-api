import mongoose from "mongoose"
import bycrpt from 'bcrypt';
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from ".env"

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password, confirmPassword } = req.body;

        //check if a user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }
        //Hash Password
        const salt = await bycrpt.genSalt(10);
        const hashedPassword = await bycrpt.hash(password, salt);

        const newUser = await User.create([{ name, email, password: hashedPassword }], { session });

        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });


        await session.commitTransaction();
        session.endSession();


        res.status(201).json({
            sucess: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser[0]
            }


        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }


export const signIn = async (req, res, next) => {

    }


    export const signOut = async (req, res, next) => {

    }