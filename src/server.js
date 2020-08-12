import express from "express";
import ConnectDB from "./config/connectDB";
import configviewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";

//Init app
let app = express();

//Connect to Mongodb
ConnectDB();

//Config view engine
configviewEngine(app);

//enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

//Init all routes
initRoutes(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, ()=>{
console.log(`Server is listening ${process.env.APP_HOST}: ${process.env.APP_PORT}`);
});
