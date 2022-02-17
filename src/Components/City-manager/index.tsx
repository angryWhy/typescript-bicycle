import { Row, Form, Select, Col, Button, Space, Card, Table, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React, { memo, useState } from 'react'
import { useAxios } from '../../utils/useAxios';
import { ColumnsType } from 'antd/es/table';
interface CityProps {

}
interface City {
    id: number
    name: string
    mode: string
    process: string
    process_mode: string
    manager: string
    open_time: string
    manager_id: string
}
const { Option } = Select
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const CityCpn: React.FC<CityProps> = memo(() => {
    const [data, setData] = useState<City[]>()
    const [loading, setLoading] = useState<boolean>(false)
    useAxios("./api/city/list.json", setData, "Citylist", setLoading)
    const columns: ColumnsType<City> = [
        {
            title: "id",
            dataIndex: "id"
        },
        {
            title: "城市名称",
            dataIndex: "name"
        },
        {
            title: "用车模式",
            dataIndex: "mode"
        },
        {
            title: "营运模式",
            dataIndex: "process"
        },
        {
            title: "授权加盟商",
            dataIndex: "process_mode"
        },
        {
            title: "管理员",
            dataIndex: "manager"
        },
        {
            title: "开通时间",
            dataIndex: "open_time"
        },
        {
            title: "操作人员",
            dataIndex: "manager_id"
        }
    ]
    return (
        <div><Card>
            <Form layout="inline">
                <Form.Item label="城市" >
                    <Select style={{ width: 100 }} >
                        <Option value={1}>全部</Option>
                        <Option value={2}>杭州</Option>
                        <Option value={3}>北京</Option>
                        <Option value={4}>上海</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="用车模式">
                    <Select style={{ width: 100 }} >
                        <Option value={1}>全部</Option>
                        <Option value={2}>禁停区</Option>
                        <Option value={3}>停车点</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="运营模式">
                    <Select style={{ width: 100 }} >
                        <Option value={1}>全部</Option>
                        <Option value={2}>加盟</Option>
                        <Option value={3}>自营</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="加盟商授权状态">
                    <Select style={{ width: 100 }} >
                        <Option value={1}>全部</Option>
                        <Option value={2}>Cally</Option>
                        <Option value={3}>Lilly</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{ marginLeft: "20px" }}>查询</Button>
                    <Button style={{ marginLeft: "20px" }}>重置</Button>
                </Form.Item>
            </Form>
        </Card>
            <Card>
                <Spin spinning={loading} indicator={antIcon}>
                    <Button>开通城市</Button>
                    <Table<City> columns={columns} dataSource={data} />
                </Spin>
            </Card>
        </div>
    )
})

export default CityCpn