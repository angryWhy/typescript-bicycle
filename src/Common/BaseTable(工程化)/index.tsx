import React, { memo, ReactText } from 'react'
import HeadCpn from './Head-Cpn'
export enum AntdType  {
  INPUT = "INPUT",
  SELECT = "SELECT",
  CHECKBOX = "CHECKBOX",
  DATEPICK = "DATEPICK",
  BUTTON = "BUTTON"
}
interface BaseTableProps{

}
export type OptionType = {
  value:number | string ,
  text:string
}
export  interface ItemType {
  type:string,
  label?:string,
  name?:string,
  placeholder?:string,
  width?:string,
  option?:OptionType[],
  buttonText?:string
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
    {
      type:AntdType.CHECKBOX,
      label:"订单状态",
      name:"order_list",
      width: "200px",
      option:[
        {
          value:0,
          text:"全部"
        },
        {
          value:1,
          text:"进行中"
        },
        {
          value:2,
          text:"结束"
        }
      ]
    },
    {
      type:AntdType.DATEPICK,
      name:"time",
      label:"订单时间"
    },
    {
      type:AntdType.BUTTON,
      buttonText:"查询"
    },
    {
      type:AntdType.BUTTON,
      buttonText:"重置",
      width:"20px"
    }
  ]
  return (
    <div>
      <HeadCpn FormList={FormList}/>
    </div>
  )
})

export default BaseTable