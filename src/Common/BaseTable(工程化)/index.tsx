import React, { memo, ReactText } from 'react'
import HeadCpn from './Head-Cpn'
export enum AntdType  {
  INPUT = "INPUT",
  SELECT = "SELECT",
  CHECKBOX = "CHECKBOX"
}
interface BaseTableProps{

}
export type OptionType = {
  value:number | string ,
  text:string
}
export  interface ItemType {
  type:string,
  label:string,
  name?:string,
  placeholder?:string,
  width?:string,
  option?:OptionType[]
}
const BaseTable:React.FC<BaseTableProps> = memo(() => {
  const FormList:Array<ItemType> = [
    {
      type:AntdType.CHECKBOX,
      label:"城市",
      name:"city",
      width:"200px",
      option :[
        {
          value:0,
          text:"杭州"
        },
        {
          value:1,
          text:"北京"
        },
        {
          value:2,
          text:"上海"
        }
      ]
    },

  ]
  return (
    <div>
      <HeadCpn FormList={FormList}/>
    </div>
  )
})

export default BaseTable