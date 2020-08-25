import express from "express";
import ConnectDB from "./config/connectDB";
import configviewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";

//Init app
let app = express();

//Connect to Mongodb
ConnectDB();

//Config session
configSession(app);

//Config view engine
configviewEngine(app);

//Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

// Enable flash messages
app.use(connectFlash());

//Config passport js
app.use(passport.initialize());
app.use(passport.session());

//Init all routes
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, ()=>{
console.log(`Server is listening ${process.env.APP_HOST}: ${process.env.APP_PORT}`);
});
