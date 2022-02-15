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
                        if (params === "name") {
                            callBack(res.data.data.name)
                        }
                        if (params === "list") {
                            callBack(res.data.result.list)
                            if (setLoading)
                                setLoading(false)
                        }
                    }, 2000);
                }
            )
        }
        , [url, callBack, params,setLoading])
}