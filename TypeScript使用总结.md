# TypeScript

# 体系中

### 实用程序类型

#### Partial < Type >

构造一个所有属性都`Type`设置为可选的类型。此实用程序将返回一个表示给定类型的所有子集的类型。

意思就是将类型集合，变成可选（title:string    =>    title?:string）

```typescript
//定义Todo类型集合
interface Todo {
  title: string;
  description: string;
}
 //创建todo1实例，Todo类型
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
const todo2 = updateTodo(todo1, 
  //对应，fieldsToUpdate: Partial<Todo>，为什么编译通过，因为Partial<Todo>将类型集合设置可选
  等价于===
  //interface Todo {
  //title?: string;
  //description?: string;
  //}
  {description: "throw out trash",}
                        );
 

```

#### Omit<Type, Keys>

`Type`通过从中选择所有属性然后删除`Keys`（字符串文字或字符串文字的联合）来构造类型。

从目标类型集合中，选中类型然后移除，（第一个参数目标类型集合，第二个参数要移除的类型）

！！！使用场景，自己定义类型和官方或者已定义好的类型冲突，！！！自己创的想覆盖已有类型

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
 
type TodoPreview = Omit<Todo, "description">;
 //操作对象Todo，要移除的类型description，！！！使用string类型
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};
```

### 类型断言

#### 断言

！为类型运算符，非空类型断言，从某个类型中剔除undefined类型和null类型，

```
例如 exp推导类型 number|undefined ，
exp! , 的类型改变为number
```

as为类型断言

```
type par = string | number
type P = par as number
```

?,问号使用场景

```typescript
1.可选属性
const obj = {
name?:string
}

2.可选参数，必须在最后
const fn = (payload?:string) => {}

3.三元运算符
let a = (1>2) ? true : false 

4.安全链式调用
// 这里 Error对象定义的stack是可选参数，如果这样写的话编译器会提示
// 出错 TS2532: Object is possibly 'undefined'.
return new Error().stack.split('\n');

// 我们可以添加?操作符，当stack属性存在时，调用 stack.split。
// 若stack不存在，则返回空
return new Error().stack?.split('\n');

// 以上代码等同以下代码
const err = new Error();
return err.stack && err.stack.split('\n');
```



### 一些技巧

#### 关于对象方面

定义多个字符串或者数值属性类型

```typescript
type Obj = {
    //字符串键，字符串值
[key:string]:string
}
```

#### Object["方法名"]调用对象方法，报错

```typescript
const obj = {
 say(){
 console.log()
 }
 eat(){
 console.log()
 }
}
// T为传入对象，K为对象的方法名string
//声明T对象，然后通过keyof 取得T的方法名，泛型K继承限制
function props<T extends object,K extends keyof T> (obj:T,key:K){
    return obj[key]
}
props(obj,"say")
```

文档地址：https://blog.csdn.net/qq_45301392/article/details/118343769

# 项目中

### 自定义组件，样式不生效？

问题描述：

```typescript
<Col span={4}>
          <Nav className="navleft"/>
          //自定义Nav组件，className，报错
</Col>
```

分析：className相当于传统的Props，需要在Nav定义一下，然后再使用。

```typescript
interface NavProps {
  className?:string
}
//再把定义好的类型结合放进
Nav:React.FC<NavProps>
```

### ！！！箭头函数写法

##### 错误写法

```typescript
const err:返回值=（参数）=>{}
//字面量和函数两种写法
```

##### 正确写法

```typescript
//写法一，简单来说，函数名后面{}里定义了完整的函数类型
const cor :{(参数):number[]}=()=>{}

//写法二,简写
const cor2 =():number =>{
}
```

### 定义回调函数

当想传一个函数，类型可为Function

```
useAxios("1",()=>{})
*callBack*:Function
```

### hooks中useState用法

```typescript
function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
const [count , setCount] = useState<number>()
```

可以这样用

```typescript
const [ data,setData] = useState<定义的类型>（）
```

### hooks中useReducer用法

步骤：

1.定义好state子元素类型，在定义state类型

2.useReducer和平常一样

3.注意reducer方法，state：State类型，action：定义action类型，需要返回State类型

```javascript
//枚举类型，相当于常量
enum CountActionKind {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}
//定义Action类型
interface CountAction {
  type: CountActionKind;
  payload: number;
}

//state类型
interface CountState {
  count: number;
}

//state类型对应state，action对应action
function counterReducer(state: CountState, action: CountAction) ：CountState {
  const { type, payload } = action;
  switch (type) {
    case CountActionKind.INCREASE:
      return {
        ...state,
        value: state.count + payload,
      };
    case CountActionKind.DECREASE:
      return {
        ...state,
        value: state.count - payload,
      };
    default:
      return state;
  }
}
```

用法：https://juejin.cn/post/6844903846607585293



# Antd中使用TS

## 1.Table表格

#### TypeScript用法

https://ant.design/components/table-cn/#API

```typescript
1.//定义dataSource每一项的类型结构
interface DataItem{
    id: string,
    userName: string,
    sex?: string,
    key: number
}
2.//dataSource也要使用定义的结构
const dataSource : DataItem[]=[ 
    {id:"a",userName:"b"} 
                              ]
3.//columns 也要使用data结构，
//相当于ColumnsType<T>
const columns :ColumnsType<DataItem> =[
    {
      title: "id",
      dataIndex: "id",
      key: "id"
    }
]
4.//<Table>组件内嵌类型-completed
<Table<Data> dataSource={data} columns={columns} />

```

#### 行单击事件（bug）

1.问题：onRow事件的index是从0开始计算，第一行为0，key值为0

如果dataSource里key值不是从0开始，会产生bug

#### Radio和Checkbox（hooks）

```typescript
1.定义key和item的数据，Data[]|Data使用联合类型，可以是单独Data类型（用于Radio），可以Data[](用于Data[])
const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[] >()
const [selectedRows, setselectedRows] = useState<Data[]|Data>()
2.rowSelection
const rowSelection = {
    //selectedRows: Data[] |Data,这里与useState<Data[]|Data>，目的一样
    onChange: (selectedRowKeys: React.Key[], selectedRows: Data[] |Data) => {
      console.log("onChange事件触发");
      //设置key和item
      setselectedRowKeys(selectedRowKeys)
      setselectedRows(selectedRows)
      console.log(`单选框-selectedRowKeys: ${selectedRowKeys}`, '单选框-selectedRows: ', selectedRows);
      console.log(selectedRowKeys);
    },
    selectedRowKeys
  }
3.onRow事件
onRow={(record,index) => {
            //onRow，的index从0开始计算
              return {
                onClick:e=>{
                  //这里要使用断言
                  let asIndex = [index as number]
                  // setselectedRowKeys([a])
                  // setselectedRows(record)
                  // console.log("行单击",selectedRowKeys);
                  rowSelection.onChange(asIndex,record)
                  
                }
              }
            }

```

![](E:\ts with project\ts-bicycle\onRow - 断言.png)

onRow传过来的是number | undefined

如果直接把index，传入到onChange事件的第一个参数，报错

```
不能将类型“undefined”分配给类型“Key”
type React.Key = string | number
//onChange
onChange: (selectedRowKeys: React.Key[], 
//第一个参数类型则为  React.key[]可能等同于（string|number）[]
使用断言确定 index为 number类型
```

#### Columns，render方法返回组件

```javascript
{
      title:"删除",
      render(text,item){
        return(<Button onClick={(e)=>{handleDelete(text,item)}} type="link">删除</Button>)
}
//以下行不通
{
      title:"删除",
      render(text,item){
        return(<a onClick={(text,item)=>{handleDelete(text,item)}} >删除</a>)
//类型不兼容，参数类型问题
}
```



## 2.Modal内嵌Form

1.使用forwardRef，拿到FormInstance实例

2.https://ant.design/components/form-cn/#components-form-demo-form-in-modal

文档已给出方法

```javascript
文档例子：分析
CollectionsPage//父组件，

const [visible, setVisible] = useState(false)//控制Modal显示

const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  }
//Modal内嵌Form，确认触发事件

CollectionCreateForm//子组件，Modal+Form


```

## 3.AntdForm中使用ref

例子：https://ant.design/components/form-cn/#components-form-demo-control-ref

FormInstance实例：https://ant.design/components/form-cn/#FormInstance

```javascript
typescript中使用
//引入FormInstance类型
import { FormInstance } from 'antd/es/form';

//类组件
formRef = React.createRef<FormInstance>();
//hook
const ref = useRef<FormInstance>(null)//null值要设置

//挂载
<Form layout='inline' ref={formRef}>
    
//操作，！！！注意类型断言，把null类型剔除
formRef.current!.getFieldsValue()

```



# 第三方库引用

## 需要声明文件

```typescript
1.在src目录下，创建types，common.d.ts
2.声明 
  以window百度地图为例
  declare interface Window {
    BMapGL: any
}
  
```



# 额外的

### Styled-components，没有提示

下载插件vscode-styled-components 
