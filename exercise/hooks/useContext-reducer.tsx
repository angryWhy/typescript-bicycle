
import { createContext, useReducer } from 'react';

interface IAppProps {
}
interface State{

}
interface Action{
  type:string,
  payload?:string
}
type CallBack = (a:string) =>void
const aa :CallBack = ()=>{
  setTimeout(() => {
    
  }, 100);
}

interface AppContextInterface {
  state: any
  dispatch: React.Dispatch<Action>;
}
const App: React.FunctionComponent<IAppProps> = (props) => {
  const themes = {
    light: {
      foreground: "#000000",  
      background: "#eeeeee"
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222"
    }
  }
  const Context = createContext<AppContextInterface>({
    state:themes,
    dispatch :(action:Action)=>action
  })
  function reducer(state:State,action:Action) :State {
    return state
  }
  const state1 :State={
  
  }
  const [state, dispatch] = useReducer(reducer,state1)
  return(
    <div>
      <Context.Provider value={{state,dispatch}}>

      </Context.Provider>
    </div>
  )
};

export default App;
function name<T>(params:T) :T {
  return params
  
}
name(1)
const arr = [8,5] as const 
function sum(a:number,b:number) {
  
}
sum(...arr)
function usIs (params : string) : params is string{
return typeof params==="string"
}
const ae = usIs("1")
export {}