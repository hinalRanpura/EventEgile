const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middleware/error");

//config
dotenv.config({path:"backend/config/config.env"});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//Route imports
const venue = require("./routes/venueRoute");
const user = require("./routes/userRoute");
const event = require("./routes/eventRoute");
const caterer = require("./routes/catererRoute");
const decoration = require("./routes/decorationRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1",venue);
app.use("/api/v1",user);
app.use("/api/v1",event);
app.use("/api/v1",caterer);
app.use("/api/v1",decoration);
app.use("/api/v1",payment);


//Middleware for errors
app.use(errorMiddleware);


module.exports = app