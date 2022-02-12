import React, { memo,useState } from 'react'
import {HeaderWrapper} from "./style"
import { Button } from 'antd'
import { useAxios } from '../../utils/useAxios'
const Header = memo(() => {
  const [data, setData] = useState()
  useAxios("./api/mock.json",setData)
 console.log(data);
 
  return (
    <HeaderWrapper>
        <div>
          <span>欢迎</span>
          <Button type='primary'>111</Button>
        </div>
    </HeaderWrapper>
  )
})

export default Header