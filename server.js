import express from "express";
let app = express();

let hostname = 'localhost';
let port = 3000;

app.get('/', (req, res)=> {
    res.send('<h1>hello world</h1>');
});

app.listen(port, hostname, ()=>{
console.log(`Server is listening ${hostname}: ${port}`);
});
