import express from "express";
import ConnectDB from "./config/connectDB";
import ContactModel from "./models/contact.model";

let app = express();

//Connect to Mongodb
ConnectDB();

app.get("/", async (req, res)=> {
    try {
        let item = {
            userId: "1710172",
            contactId: "duchieu",
        };
        let contact = await ContactModel.createNew(item);
        res.send(contact);
    } catch (error) {
        console.log(error);
    }
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, ()=>{
console.log(`Server is listening ${process.env.APP_HOST}: ${process.env.APP_PORT}`);
});
