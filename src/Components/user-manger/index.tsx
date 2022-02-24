import React, { memo, useState } from 'react'

import HeadCpn from '../../Common/BaseTable(工程化)/Head-Cpn';

import { ItemType, AntdType } from '../../Common/BaseTable(工程化)/index';
import { Button, Card, Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import CreateUser from './CreateUser';
import { useAxios } from '../../utils/useAxios';
import { ColumnsType } from 'antd/es/table/Table';
import CompileUser from './compileUser';
interface UserProps {

}
export interface Data {
    id: number,
    userName: string,
    sex: number,
    state: number,
    interest: number,
    birthday: string,
    address: string,
    time: string,
    key: React.Key
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const User: React.FC<UserProps> = memo(() => {
    const [visible, setVisible] = useState<boolean>(false);
    const [visible_compiler, setVisible_compiler] = useState<boolean>(false);
    const [data, setData] = useState<Data[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[]>()
    const [selectedRows, setselectedRows] = useState<Data[] | Data>()
    useAxios("./api/table/list.json", setData, "list", setLoading)
    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };
    const onCreate_com = (values: any) => {
        console.log('Received values of form: ', values);
        setVisible_compiler(false);
    };
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Data[] | Data) => {
            console.log("onChange事件触发");

            setselectedRowKeys(selectedRowKeys)
            setselectedRows(selectedRows)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            console.log(selectedRowKeys);

        },
        selectedRowKeys
    }
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
            title: "id",
            dataIndex: "id"
        },
        {
            title: "用户名",
            dataIndex: "userName"
        },
        {
            title: "性别",
            dataIndex: "sex"
        },
        {
            title: "状态",
            dataIndex: "state"
        },
        {
            title: "爱好",
            dataIndex: "interest"
        },
        {
            title: "生日",
            dataIndex: "birthday"
        },
        {
            title: "联系地址",
            dataIndex: "address"
        },
        {
            title: "时间",
            dataIndex: "time"
        }
    ]
    return (
        <div>
            <Card>
                <HeadCpn FormList={formList} />
            </Card>
            <Card>
                <Button type='primary' onClick={e => { setVisible(true) }} style={{ marginLeft: "20px" }}>创建员工</Button>
                <Button type='primary' onClick={e => { setVisible_compiler(true) }} style={{ marginLeft: "20px" }}>编辑员工</Button>
                <Button type='primary' onClick={e => { }} style={{ marginLeft: "20px" }}>员工详情</Button>
                <Button type='primary' onClick={e => { }} style={{ marginLeft: "20px" }}>删除员工</Button>
                <CreateUser onCreate={onCreate} onCancel={() => { setVisible(false) }} visible={visible} />
                <CompileUser onCreate={onCreate_com} onCancel={() => { setVisible_compiler(false) }} visible={visible_compiler} selectedRows={selectedRows!}/>
            </Card>
            <Card>
                <Spin indicator={antIcon} spinning={loading}>
                    <Table<Data> columns={columns} dataSource={data} rowSelection={{
                        type: "radio",
                        ...rowSelection,
                    }}
                        onRow={(record, index) => {
                            //onRow，的index从0开始计算
                            return {
                                onClick: e => {
                                    let asIndex = [index as number]

                                    // setselectedRowKeys([a])
                                    // setselectedRows(record)
                                    // console.log("行单击",selectedRowKeys);
                                    rowSelection.onChange(asIndex, record)

                                }
                            }
                        }
                        } />
                </Spin>
            </Card>
        </div>
    )
})
export default User