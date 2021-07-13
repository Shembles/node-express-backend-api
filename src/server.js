import app from "./app.js"
import dotenv from 'dotenv';

// Init environment 
dotenv.config();

const port = Number(process.env.SERVER_PORT || 3200);

app.listen(port, () =>
console.log(`Server running on port ${port}!`));