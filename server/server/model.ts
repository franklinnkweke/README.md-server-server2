import { resolve } from "path"
import data from  "./datas.json"

const fs = require("node:fs")
const path = require("path")

interface result{
    [key:string]:string|number|string[]
}
const selectAll = ()=>{
    return new Promise((resolve)=>{
        resolve(data)
    })
}

const selectOne = (id:number) =>{
    return new Promise((resolve)=>{
        const info = data.find(info => info.id === id)
        resolve(info);
    })
}

const creat = (newInfo:any) => {
    return new Promise((resolve)=>{
        
        let  value = {...newInfo}
       
        data.push(value)
        
        
        console.log(JSON.stringify(data,null,2))
        fs.writeFile('../server/server/datas.json',JSON.stringify(data,null,2),"utf8",(err:string)=>err && console.log(err))
       
        resolve(value)
    })
}


const update = (newInfo:any,id:number)=>{
   
    return new Promise((resolve)=>{
        let indx = data.findIndex(indx => indx.id === id)

        data[indx] ={...newInfo}

        fs.writeFile('../server/server/datas.json',JSON.stringify(data,null,2),"utf8",(err:string)=>err && console.log(err))
        resolve(data[indx])

    })
}

const remove = (id:number)=>{
    return new Promise((resolve)=> {
        let companyifo = data.filter(p => p.id !== id)
       
        fs.writeFile('../server/server/datas.json',JSON.stringify(companyifo,null,2),"utf8",(err:string)=> err && console.log(err))
        resolve(undefined)
    })
}
export {selectAll, selectOne,creat,update,remove}