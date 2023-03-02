import {selectAll,selectOne,creat,update,remove} from "./model"
import http, { IncomingMessage, Server, ServerResponse } from "http";
import { getPostData } from "./utility";

const getCompaniesInfos =async (req:IncomingMessage,res:ServerResponse) => {
   try{
    const companyInfos = await selectAll()
    res.setHeader("Content-Type","application/json")
    return res.end(JSON.stringify(companyInfos))
   }catch(err){
    throw err
   }

}


const getCompanyinfo = async (req:IncomingMessage, res:ServerResponse,id:number)=>{
   try{
         const info = await selectOne(id)
         if(!info){
            res.setHeader("Content-Type","text/html")
            res.end("<h1>Company not found</h1>")
         }else{
            res.setHeader("Content-Type","application/json")
            res.end(JSON.stringify(info)) 
         }
   }catch(err){
      throw err
   }
}

const creatCompanyinfo = async (req:IncomingMessage,res:ServerResponse)=>{
   try{
   
      let newInfo:any  = await getPostData(req)
      
      const companyInfo:any = await selectAll()
       let currInfo = {
         "organization": newInfo.organization,
         "createdAt": newInfo.createdAt,
         "updatedAt": newInfo.updatedAt,
         "products": [ ...newInfo.products],
         "marketValue": newInfo.marketValue,
         "address": newInfo.address,
         "ceo": newInfo.ceo,
         "country": newInfo.country,
         "id": companyInfo.length+1,
         "noOfEmployees": newInfo.noOfEmployees,
         "employees": [ ...newInfo.employees ]
       }
      let result = await creat(currInfo)
      res.setHeader("Content-Type","application/json")
      res.end(JSON.stringify(result)) 
   
   } catch(err){
      throw err
   }
}

const updateCustomerInfo = async (req:IncomingMessage,res:ServerResponse,id:number)=>{
   try{
      const product:any = await selectOne(id)
      console.log("product ",product)
      if(!product){
         res.setHeader("Content-Type","text/html")
         res.end("<h1>no product found</h1>")
      }else{
         let updatedInfo:any = await getPostData(req)
         console.log(updatedInfo)
         let currInfo:any = {
            ...updatedInfo,
            "organization": updatedInfo.organization || product.organization,
            "createdAt": updatedInfo.createdAt || product.createdAt,
            "updatedAt": updatedInfo.updatedAt || product.updatedAt,
            "products": updatedInfo.product || product.products,
            "marketValue": updatedInfo.marketValue || product.marketValue,
            "address": updatedInfo.address || product.address,
            "ceo": updatedInfo.ceo || product.ceo, 
            "country": updatedInfo.country || product.country,
            "id":id,
            "noOfEmployees": updatedInfo.noOfEmployees|| product.noOfEmployees,
            "employees": updatedInfo.employees  || product.employees
         }
      
         const updatep = await update(currInfo,id)
         res.setHeader("Content-Type","application/json")
         res.end(JSON.stringify(updatep))

      }
      
  }catch(err){
      throw err
  }
}

const deleteCompanyIfo = async (req:IncomingMessage,res:ServerResponse,id:number)=>{
   try{
      const companyifo = await selectOne(id)

      if(companyifo){
         await remove(id)
         res.setHeader("Content-Type","text/html")
         res.end("<h1>Product removed Successfully</h1>")
      }else{
         res.end("Id doesnt exist any longer..")
      }
   }catch(err){
      throw err
   }
}

export {getCompaniesInfos,getCompanyinfo,creatCompanyinfo,updateCustomerInfo,deleteCompanyIfo}