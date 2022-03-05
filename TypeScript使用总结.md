# TypeScript

# 体系中

### 实用程序类型

#### Partial < Type >

构造一个所有属性都`Type`设置为可选的类型。此实用程序将返回一个表示给定类型的所有子集的类型。

 注意这是浅 Partial 

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

#### Required< Type >

```
反面Partial
所有的属性必须有
```

#### Readonly< Type>

```typescript
interface Todo {
  title: string;
}
 //属性不能重新分配
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
 
todo.title = "Hello";//ERROR
```

#### Record<Keys, Type>

```typescript
interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";
 
const cats: Record<CatName, CatInfo> = {
  //CatName:键的类型（例子为联合）
  //CatInfo：值的类型
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

//用法，
多用于取代object:Object
    const object :Object
    //用法
    obj :Reacord<string,unknow>
        //转换
    Object=>Reacord<string,unknow>
    //空对象
    obj3: Record<string, never>
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

#### Pick<Type, Keys>

```typescript
从Type里挑选 key，组成新的类型
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">
```

#### Exclude<UnionType, ExcludedMembers>

```typescript
从Union里去除Member类型

type T0 = Exclude<"a" | "b" | "c", "a">;
type T0 = "b" | "c"

type T2 = Exclude<string | number | (() => void), Function>;
type T2 = string | number
```

#### Extract<Type, Union>（交集）

```
type T1 = Extract<string | number | (() => void), Function>;
type T1 = () => void
```

#### ReturnType<T>

```
它接受一个*函数类型*并产生它的返回类型
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
    
type K = boolean

function f() {
  return { x: 10, y: 3 };
}
//取出类型
type P = ReturnType<typeof f>
```



#### keyof，typeof，is

```typescript
keyof
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
A类型为number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
M类型为number或者string

这是因为 JavaScript 对象键始终强制转换为字符串 obj[0]，obj["0"]

在对象或者枚举中使用keyof typeof
const bmw = { name: "BMW", power: "1000hp" }
type CarLiteralType = keyof typeof bmw
let carPropertyLiteral: CarLiteralType
carPropertyLiteral = "name"       
carPropertyLiteral = "power"      
carPropertyLiteral = "anyOther"//ERROR
//枚举
//运行时作为对象存在
enum ColorsEnum {
    white = '#ffffff',
    black = '#000000',
}
type b = keyof typeof ColorsEnum


typeof
const obj = {a:1,0:"2"}
typeof obj，显示 值 的类型


function isString(test: any): test is string{
    return typeof test === 'string';
}

function example(foo: number | string){
    if(isString(foo)){
        console.log('it is a string' + foo);
        console.log(foo.length); // string function
    }
}
example('hello world');
//返回true则为
is 为关键字的「类型谓语」把参数的类型范围缩小了,当使用了 test is string 之后,我们通过 isString(foo) === true 明确知道其中的参数是 string,而 boolean 并没有这个能力,这就是 is 关键字存在的意义.
```



https://blog.csdn.net/u011607490/article/details/85410010?ops_request_misc=&request_id=&biz_id=102&utm_term=ts%E4%B8%AD%E7%9A%84is&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-85410010.nonecase&spm=1018.2226.3001.4187

### 类型断言

#### 断言

！为类型运算符，非空类型断言，从某个类型中剔除undefined类型和null类型，

```
例如 exp推导类型 number|undefined ，
exp! , 的类型改变为number
```

as为类型断言

```typescript
type par = string | number
type P = par as number
//as const实现了从string | number到readonly [number, string]转化
```

as const断言

```
let array = ["12",567]  ,string | number类型
let array = ["12",567] as const
通过as const限定后，数组类型变为readonly [number, string]
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

### 类型定义的建议

- 对象类型尽量使用Record<string, unknown> 代替{} 和**object**

    ```typescript
    obj2Better1: Record<string, unknown>; // ✅  代替 obj: object
    
    obj2Better3: Record<string, never>; // ✅ 空对象
    ```

- 函数类型不建议直接给 Function 类型，有明确的参数类型、个数与返回值类型最佳

    ```typescript
    click : Function //任何可调用的函数
    onChange: (id: number) => void; 
    click:()=>void  // ✅ better ，明确参数无返回值的函数
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
    ```

- React Prop 类型

    ```
    //
    children: React.ReactNode; // ✅ best, 最佳接收所有 children 类型
    //
    functionChildren: (name: string) => React.ReactNode; // ✅ 返回 React 节点
    ```

    

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
一些状态初始值为空时（null），需要显示地声明类型：
const [user, setUser] = React.useState<User | null>(null)

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



### hooks中useContext用法

### Context和Reducer替代，redux

```typescript
interface AppContextInterface {
    state: typeof initialState;
    dispatch: React.Dispatch<ACTIONTYPE>;
}
//可以定义Action
const AppCtx = React.createContext<AppContextInterface>({
    state: initialState,
    dispatch: (action) => action,
});
const App = (): React.ReactNode => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppCtx.Provider value={{ state, dispatch }}>
            <Counter />
        </AppCtx.Provider>
    );
};

// 消费 context
function Counter() {
    const { state, dispatch } = React.useContext(AppCtx);
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'decrement', payload: '5' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>+</button>
        </>
    );
}

```



### hooks中useRef用法

```typescript
const ref1 = React.useRef<HTMLInputElement>(null)

const ref2 = React.useRef<HTMLInputElement | null>(null)
//第一种方式的 ref1.current 是只读的（read-only），并且可以传递给内置的 ref 属性，绑定 DOM 元素 ；
//第二种方式的 ref2.current 是可变的（类似于声明类的成员变量）
//使用时，都需要对类型进行检查:
ref1.current?.focus()
```



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
