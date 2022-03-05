interface Obj {
    data?:string,
    name:string
}
const obj :Obj = {
    name:"name"
}
const a=obj.name
const b=obj?.data
export default obj

// // 这里 Error对象定义的stack是可选参数，如果这样写的话编译器会提示
// // 出错 TS2532: Object is possibly 'undefined'.
// return new Error().stack.split('\n');

// // 我们可以添加?操作符，当stack属性存在时，调用 stack.split。
// // 若stack不存在，则返回空
// return new Error().stack?.split('\n');

// // 以上代码等同以下代码
// const err = new Error();
// return err.stack && err.stack.split('\n');