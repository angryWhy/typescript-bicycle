import { useEffect } from "react"
import axios from "axios"
export function useAxios (url:string,callBack:Function,params?:{}) :void{
    useEffect(
        ()=>{
            axios.get(url).then(
                res=>{
                    callBack(res)
                }
            )
        }
    ,[url,callBack])
}