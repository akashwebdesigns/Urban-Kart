const express=require("express");
const app=express();
const cookieParser = require("cookie-parser");
const fileUpload=require("express-fileupload");
const errorMiddleware = require("./middleware/error");
const path=require('path');

//config
// dotenv.config({path:"backend/config/config.env"});



if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "/public")));

//Route Imports

const product=require("./routes/productRoute");
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");
const payment=require("./routes/paymentRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

if(process.env.NODE_ENV === "PRODUCTION"){
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}


app.use(errorMiddleware);


module.exports = app;