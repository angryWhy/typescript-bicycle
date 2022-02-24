//解决对象[]使用
const obj = {
    name:"aaa",
    "sex":"nan"
}
function props<T extends object,K extends keyof T> (obj:T,key:K){
    return obj[key]
}
props(obj,"name")
export default obj