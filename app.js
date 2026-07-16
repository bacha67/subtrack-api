import express from "express";
import { PORT } from './config/env.js'
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";

const app = express();
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscription', subscriptionRouter)


app.get('/', (req, res) => {
    res.send('  Wellcome to the subscription Tracker API!')
})
app.listen(PORT || 3000, async () => {
    console.log(`Subscription Tracker API is running on  http://localhost:${PORT || 3000}`);

    //connect to database
    await connectToDatabase();

})

export default app;
// Trigger restart