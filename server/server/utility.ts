import { writeFile } from "fs"
import fs from "fs"
import http, { IncomingMessage, Server, ServerResponse } from "http";




const getPostData = (req:IncomingMessage) =>{
    return new Promise((resolve,reject)=>{
        try{
            let body = ""
            req.on("data",(chunk)=>{
                body += chunk.toString()
            })
            req.on("end", ()=>{
               
                let newBody = JSON.parse(body)
                resolve(newBody)
            })
        }catch(err){
            reject(err)
        }
    })
}

export {getPostData}