import { useEffect } from "react"
import axios from "axios"
//回调函数？？？
export function useAxios (url:string,callBack:Function,params?:{}) :void{
    useEffect(
        ()=>{
            axios.get(url).then(
                res=>{
                    if(res.data.data.name)
                    callBack(res.data.data.name)
                }
            )
        }
    ,[url,callBack])
}