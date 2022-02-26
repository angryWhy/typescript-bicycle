import { Button, Card, Modal, Table } from 'antd'
import React, { memo, useState } from 'react'
import { ColumnsType } from 'antd/lib/table';
import { useAxios } from '../../utils/useAxios';
import Create from './createUser';
import Premission from './premUser/index';
import SetUser from './setUser/index';
interface PowProps {

}
export interface User {
    id: string,
    role: string,
    make_time: string,
    status: string,
    allow_time: string,
    user_name: string,
    key: React.Key
}
const Poewman: React.FC<PowProps> = memo(() => {
    const [data, setData] = useState<User[]>()
    useAxios("./api/role/list.json", setData, "prem")
    const [creShow, setCreShow] = useState<boolean>(false)
    const [treeShow, setTreeShow] = useState<boolean>(false)
    const [comShow, setComShow] = useState<boolean>(false)
    const [creData, setCreData] = useState()
    const [treeData, setTreeData] = useState()
    const [comData, setComData] = useState()
    const columns: ColumnsType<User> = [
        {
            title: "角色ID",
            dataIndex: "id"
        },
        {
            title: "角色名称",
            dataIndex: "role"
        },
        {
            title: "创建时间",
            dataIndex: "make_time",
        },
        {
            title: "使用状态",
            dataIndex: "status",
            render(status) {
                return status === 1 ? "停用" : "启用"
            }
        },
        {
            title: "授权时间",
            dataIndex: "allow_time"
        },
        {
            title: "授权人",
            dataIndex: "user_name"
        }
    ]
    //获取创建表单的值
    const getCreateData = (value: any) => {
        setCreData(value)
        console.log("创建表单用户的值",value);

    }
    //权限管理的值
    const getTreeeData = (value: any) => {
        setTreeData(value)
        console.log("权限管理的值",value);

    }
    //编辑用户的值
    const getCompilerData = (value: any) => {
        setComData(value)
        console.log("编辑用户的值",value);

    }
    return (
        <div>
            <Card>
                <Button style={{ margin: "0 20px" }} type="primary" onClick={e => { setCreShow(true) }}>创建角色</Button>
                <Button style={{ margin: "0 20px" }} type="primary">设置权限</Button>
                <Button style={{ margin: "0 20px" }} type="primary">用户授权</Button>
            </Card>
            <Card>
                <Table<User> columns={columns} dataSource={data} />
            </Card>
            <Create getCreateData={getCreateData} visible={creShow} setShow={setCreShow} />
            <Premission getTreeeData={getTreeeData} visible={treeShow} setShow={setTreeShow}/>
            <SetUser getCompilerData={getCompilerData} visible={comShow} setShow={setComShow}/>
        </div>
    )
})

export default Poewman