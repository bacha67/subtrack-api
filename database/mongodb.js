import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from '../config/env.js';

if (!DB_URL) {
    throw new Error('Please provide DB_URL inside .env<devlopment/production>.local')
}
const connectToDatabase = async () => {

    try {
        await mongoose.connect(DB_URL)

        console.log(`successfully connected to database in ${NODE_ENV} mode`)

    } catch (error) {
        console.error('error connecting to database:', error.message)
    }


}

export default connectToDatabase