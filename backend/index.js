const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
   origin: process.env.FRONTEND_URL,
   credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api", router);

const PORT = process.env.PORT || 9011;
connectDB().then(() => {
    app.listen(PORT, () => {
       console.log("Server is running on port", PORT);
    })
})