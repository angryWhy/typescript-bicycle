import React, { memo, useState } from 'react'

import HeadCpn from '../../Common/BaseTable(工程化)/Head-Cpn';

import { ItemType, AntdType } from '../../Common/BaseTable(工程化)/index';
import { Button, Card, Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import CreateUser from './CreateUser';
import { useAxios } from '../../utils/useAxios';
import { ColumnsType } from 'antd/es/table/Table';
interface UserProps {

}
interface Data {
    id: string,
    userName: string,
    sex: string,
    state: string,
    interest: string,
    birthday: string,
    address: string,
    time: string,
    key: React.Key
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const User: React.FC<UserProps> = memo(() => {
    const [visible, setVisible] = useState<boolean>(false);
    const [data, setData] = useState<Data[] >()
    const [loading, setLoading] = useState<boolean>(true)
    useAxios("./api/table/list.json", setData, "list", setLoading)
    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };
    const formList: ItemType[] = [
        {
            type: AntdType.INPUT,
            label: "账号",
            placeholder: "请输入账号",
            name: "user_count"
        },
        {
            type: AntdType.INPUT,
            label: "密码",
            placeholder: "请输入密码",
            name: "user_password"
        },
        {
            type: AntdType.DATEPICK,
            label: "请选择入职时间",
            name: "user_date"
        }
    ]
    const columns: ColumnsType<Data> = [
        {
            title:"id",
            dataIndex:"id"
        },
        {
            title:"用户名",
            dataIndex:"userName"
        },
        {
            title:"性别",
            dataIndex:"sex"
        },
        {
            title:"状态",
            dataIndex:"state"
        },
        {
            title:"爱好",
            dataIndex:"interest"
        },
        {
            title:"生日",
            dataIndex:"birthday"
        },
        {
            title:"联系地址",
            dataIndex:"address"
        },
        {
            title:"时间",
            dataIndex:"time"
        }
    ]
    return (
        <div>
            <Card>
                <HeadCpn FormList={formList} />
            </Card>
            <Card>
                <Button type='primary' onClick={e => { setVisible(true) }}>创建员工</Button>
                <CreateUser onCreate={onCreate} onCancel={() => { setVisible(false) }} visible={visible} />
            </Card>
            <Card>
                <Spin indicator={antIcon} spinning={loading}>
                <Table<Data> columns={columns} dataSource={data } />
                </Spin>
            </Card>
        </div>
    )
})
export default User