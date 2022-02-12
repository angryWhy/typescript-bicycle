import React, { memo, ReactNode } from 'react'
import {NavWrapper} from "./style"

import { Menu } from 'antd';
import menuList from '../../data/menu';

interface NavProps {
  className?:string
}
 interface menu{
  title:string,
  key:string,
  children?:{title:string,key:string}[],
}
const { SubMenu } = Menu;
const Nav:React.FC<NavProps> = memo((props) => {
  const {className} = props
  //???返回值为ReactNode，？？？？
  const renderMenu = (menuList:menu[]) : ReactNode[] =>{
    const newList = menuList.map((item,index)=>{
      if(item.children){
        return(
           <SubMenu key={item.title} title={item.title}>
             {
                  renderMenu(item.children)
             }
           </SubMenu>
        )
      }
        return(
           <Menu.Item key={item.title}>
             {
               item.title
             }
           </Menu.Item>
        )
      
    })
    return newList
  }
  return (
    <NavWrapper className="navleft">
      <Menu theme="dark">
      {
        renderMenu(menuList)
      }
      </Menu>
    </NavWrapper>
  )
})

export default Nav