import http, { IncomingMessage, Server, ServerResponse } from "http";
const request = require("request")
const cheerio = require("cheerio")
// import fs from "fs"
// import { resolve } from "path";



const getData = ()=>{
  return new Promise((resolve,reject)=>{
    request("https://www.w3schools.com/", (err:any,res:ServerResponse,html:Document)=>{
        if(!err && res.statusCode===200){
            interface datatype {
                title:string,
                description:string,
                imageUrls: string[]

            }
            const $ = cheerio.load(html);
            const title = $('title').text()
            let imgUrls:string[] = []
            let data:datatype[] = []
            const description = $('meta[property="og:description"]').attr('content')
            console.log(description)
            $("img").each((index:number, imageElement:string) => {
              let imgUrl = $(imageElement).attr("src");
              imgUrls.push(imgUrl) 
             
         });
         console.log(imgUrls)
           data.push({"title":title,"description":description,"imageUrls":imgUrls})
          
           console.log(data)
           resolve(data) 
           
         }
    
})
  })  
    
}

export {getData}

