import { config } from 'dotenv';
// import { connectToDB } from "./db/db.js";
import app from './app.js';

config({ path: './config.env' });


app.listen(process.env.PORT || 8000, () => {
    console.log(`\nacademic360-backend is running at http://localhost:${process.env.PORT}`);
})

   