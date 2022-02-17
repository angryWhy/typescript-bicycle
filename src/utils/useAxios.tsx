import { useEffect } from "react"
import axios from "axios"
//回调函数？？？
export function useAxios(url: string, callBack: Function, params: string, setLoading?: Function): void {
    useEffect(
        () => {
            axios.get(url).then(
                res => {
                    if (setLoading)
                        setLoading(true)


                    setTimeout(() => {
                        //head用户名
                        if (params === "name") {
                            callBack(res.data.data.name)
                        }
                        //BaseTable组件
                        if (params === "list") {
                            callBack(res.data.result.list)
                            if (setLoading)
                                setLoading(false)
                        }
                        //city组件
                        if (params === "Citylist") {
                            console.log(res.data.result);
                            
                            callBack(res.data.result)
                            if (setLoading)
                                setLoading(false)
                        }
                    }, 2000);
                }
            )
        }
        , [url, callBack, params,setLoading])
}