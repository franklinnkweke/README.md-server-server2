import http, { IncomingMessage, Server, ServerResponse } from "http";
import {getCompaniesInfos,getCompanyinfo,creatCompanyinfo,updateCustomerInfo,deleteCompanyIfo} from "./controller"
/*
implement your server code here
*/

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if(req.url ==="/companies" && req.method==="GET"){
      getCompaniesInfos(req,res);
    }else if(req.url?.match(/\/companies\/[0-9]+/g) && req.method ==="GET"){
      const id = Number(req.url.split("/")[2])
      getCompanyinfo(req,res,id)
    }else if(req.url === "/companies" && req.method==="POST"){
      creatCompanyinfo(req,res)
    }else if(req.url?.match(/\/companies\/[0-9]+/g) && req.method === "PUT"){
      const id = Number(req.url.split("/")[2])
      console.log(id)
      updateCustomerInfo(req,res,id)
  }else if(req.url?.match(/\/companies\/[0-9]+/g) && req.method === "DELETE"){
    const id = Number(req.url.split("/")[2])
   
    deleteCompanyIfo(req,res,id) 
}
}
);



const PORT = process.env.PORT || 4000
server.listen(PORT,()=>{console.log("Server Running at Port 4000.....")});
