import { Card } from 'antd'
import React, { memo } from 'react'
import ContentCpn from '../../Common/BaseTable(工程化)/Content-Cpn/index';
import { ColumnsType } from 'antd/lib/table';
interface PowProps {

}
type user = {
    id:string,
    role:string,
    make_time:string,
    status:string,
    allow_time:string,
    user_name:string,
    key:React.Key
}
const Poewman :React.FC<PowProps>= memo(() => {
    const columns:ColumnsType<user> = [
        {
            title:"角色ID",
            dataIndex:"id"
        },
        {
            title:"角色名称",
            dataIndex:"role"
        },
        {
            title:"创建时间",
            dataIndex:"make_time"
        },
        {
            title:"使用状态",
            dataIndex:"status"
        },
        {
            title:"授权时间",
            dataIndex:"allow_time"
        },
        {
            title:"授权人",
            dataIndex:"user_name"
        }
    ]
  return (
    <div>
        <Card>
            {/* <ContentCpn columns={columns} dataSource={} type="radio" loading={}/> */}
        </Card>
    </div>
  )
})

export default Poewman