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
                    if(params==="mapData"){
                        callBack(res.data.result)
                        console.log(res.data.result);
                        
                    }
                    if(params==="prem"){
                         console.log(res.data.result);
                        callBack(res.data.result.item_list)
                        
                    }
                    if(params==="roleList"){
                        console.log(res.data.result.menus);
                        callBack(res.data.result.item_list)
                        
                    }

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
                        if (params === "order") {
                            console.log(res.data.result.item_list);
                            const newList = res.data.result.item_list as any[]
                            newList.map((item,index)=>{
                                 item.key=index
                                 return item
                            })
                            callBack(newList)
                            if (setLoading)
                                setLoading(false)

                        }
                    }, 1000);
                }
            )
        }
        , [url, callBack, params, setLoading])
}