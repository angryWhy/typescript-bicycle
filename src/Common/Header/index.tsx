import React, { memo,useState } from 'react'
import {HeaderWrapper} from "./style"
import { Button } from 'antd'
import { useAxios } from '../../utils/useAxios'
interface HeaderProps{
  className?:string
}
const Header:React.FC<HeaderProps> = memo((props) => {
  const {className} = props
  const [data, setData] = useState<string>()
  //取出的用户名
  useAxios("./api/mock.json",setData,"name")
  return (
    <HeaderWrapper className={className}>
        <div className='right-content'>
          <span>欢迎<a href='/todo'>{data}</a></span>
          
          <Button type='primary'>退出</Button>
        </div>
    </HeaderWrapper>
  )
})

export default Header