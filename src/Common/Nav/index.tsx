import React, { memo, ReactNode } from 'react'
import { NavWrapper } from "./style"

import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import menuList from '../../data/menu';
interface NavProps {
  className?: string
}
interface menu {
  title: string,
  key: string,
  children?: { title: string, key: string }[],
}
const { SubMenu } = Menu;
const Nav: React.FC<NavProps> = memo((props) => {
  //???返回值为ReactNode，？？？？
  const renderMenu = (menuList: menu[]): ReactNode[] => {
    let i = 0
    const newList = menuList.map((item, index) => {
      if (item.children) {
        i++
        return (
         
            <SubMenu key={`sub${i}`} title={item.title}>
              {
                renderMenu(item.children)
              }
            </SubMenu>
     
        )
      }
      return (
        
          <Menu.Item key={item.title}>
            <NavLink to={item.key} exact key={item.title}>
            {
              item.title
            }
            </NavLink>
          </Menu.Item>
      )

    })
    return newList
  }
  return (
    <NavWrapper className="navleft">
      <Menu mode="inline" defaultOpenKeys={['sub1']}>
        {
          renderMenu(menuList)
        }
      </Menu>
    </NavWrapper>
  )
})

export default Nav