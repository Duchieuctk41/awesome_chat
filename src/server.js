import express from "express";
import ConnectDB from "./config/connectDB";
import configviewEngine from "./config/viewEngine";

//Init app
let app = express();

//Connect to Mongodb
ConnectDB();

//Config view engine
configviewEngine(app);


app.get("/", async (req, res)=> {
 return res.render("main/master");
});

app.get("/login-register", async (req, res)=> {
    return res.render("auth/loginRegister");
   });

app.listen(process.env.APP_PORT, process.env.APP_HOST, ()=>{
console.log(`Server is listening ${process.env.APP_HOST}: ${process.env.APP_PORT}`);
});
