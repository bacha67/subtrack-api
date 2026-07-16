import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from '../config/env.js';

if (!DB_URL) {
    throw new Error('Please provide DB_URL inside .env<devlopment/production>.local')
}
const connectToDatabase = async () => {

    try {
        await mongoose.connect(DB_URL)

    } catch (error) {
        console.log('error connecting to database', error)

        process.exit(1);


    }


}

export default connectToDatabase