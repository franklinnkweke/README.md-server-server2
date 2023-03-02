import http, { IncomingMessage, Server, ServerResponse } from "http"; // import http module from node js core module 
import { resolve } from "path"; // import resolve method from path module 
const request = require("request") // import request module from node js core module   
const cheerio = require("cheerio") // import cheerio module from node js core module  
const axios = require('axios') // import axios module from node js core module  
import {getData} from "./control" // import getData method from control.ts file 



const server: Server = http.createServer( // create server 
 async (req: IncomingMessage, res: ServerResponse) => { // create async function 
    if ( req.method === "GET") { // check if request method is GET 
        
     res.setHeader("Content-Type","application/json") // set header 
      let data = await getData() // call getData method 
      res.end(JSON.stringify(data)); // send response 
    }
  }
);

server.listen(6010, ()=>{ // listen to port 6010 
  console.log("server is running on port 6010") // print message 
});
