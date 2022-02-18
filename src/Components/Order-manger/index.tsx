import { Button, Card, DatePicker, Form, Modal, Select, Spin, Table } from 'antd'
import React, { memo, useState } from 'react'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useAxios } from '../../utils/useAxios';
import { LoadingOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
interface OrderProps {

}
interface Data {
    order_id: string,
    bike_id: string,
    user_id: string,
    user_name: string,
    phone: number,
    way: number,
    time: number,
    status: number,
    start_time: string,
    end_time: string,
    pay: number,
    the_par: number
}
interface Values {
    title: string;
    description: string;
    modifier: string;
  }
interface SubFormProps {
    visible:boolean,
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const { Option } = Select
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Order: React.FC<OrderProps> = memo(() => {
    const [data, setData] = useState<Data[]>()
    const [loading, setLoading] = useState(true)
    const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[]>()
    const [selectedRows, setselectedRows] = useState<Data[] | Data>()
    const [subShow, setSubShow] = useState<boolean>(false)
    useAxios("./api/order/list.json", setData, "order", setLoading)

    const columns: ColumnsType<Data> = [
        {
            title: "id",
            dataIndex: "order_id",
            key: 0
        },
        {
            title: "单车编号",
            dataIndex: "bike_id",
            key: 1
        },
        {
            title: "用户编号",
            dataIndex: "user_id",
            key: 2
        },
        {
            title: "用户名称",
            dataIndex: "user_name",
            key: 3
        },
        {
            title: "手机号",
            dataIndex: "phone",
            key: 4
        },
        {
            title: "里程",
            dataIndex: "way",
            key: 5
        },
        {
            title: '行驶时间',
            dataIndex: "time",
            key: 6
        },
        {
            title: "状态",
            dataIndex: "status",
            key: 7
        },
        {
            title: "开始时间",
            dataIndex: "start_time",
            key: 8
        },
        {
            title: "结束时间",
            dataIndex: "end_time",
            key: 9
        },
        {
            title: "应付金额",
            dataIndex: "pay",
            key: 10
        },
        {
            title: "实付金额",
            dataIndex: "the_pay",
            key: 11
        }
    ]
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
    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setSubShow(false);
      }
    
    return (
        <div>
            <Card>
                <Form layout='inline'>
                    <Form.Item label="城市" style={{ width: 200 }}>
                        <Select>
                            <Option value={0}>全部</Option>
                            <Option value={1}>北京</Option>
                            <Option value={2}>上海</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="时间" style={{ width: 200 }}>
                        <DatePicker locale={locale} />
                    </Form.Item>
                    <Form.Item label="订单状态" style={{ width: 200 }}>
                        <Select>
                            <Option value={0}>全部</Option>
                            <Option value={1}>进行中</Option>
                            <Option value={2}>锁车</Option>
                            <Option value={3}>结束</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item >
                        <Button style={{ marginLeft: "20px" }} type="primary">查询</Button>
                        <Button style={{ marginLeft: "20px" }} type="primary">重置</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card>
                <Spin spinning={loading} indicator={antIcon}>
                    <Button onClick={e=>{setSubShow(true)}} type="primary" style={{marginLeft:"20px"}}>订单详情</Button>
                    <Button onClick={e=>{}} type="primary" style={{marginLeft:"20px"}}>结束订单</Button>
                    <Table<Data> columns={columns}
                        rowSelection={{
                            type: "radio",
                            ...rowSelection,
                        }}
                        onRow={(record,index) => {
                              return {
                                onClick:e=>{
                                  let asIndex = [index as number]
                                  rowSelection.onChange(asIndex,record)
                                }
                              }
                            }
                        }
                        dataSource={data} />
                </Spin>
            </Card>
            <SubForm visible={subShow} onCreate={onCreate} onCancel={()=>{setSubShow(false)}}/>
        </div>
    )
})
const SubForm :React.FC<SubFormProps> = ({visible,onCreate,onCancel})=>{
    const [form] = Form.useForm();
    return(
        <Modal 
        visible={visible}
        okText="提交"
        cancelText="取消"
        onOk={() => {
            form
              .validateFields()
              .then(values => {
                form.resetFields();
                onCreate(values);
                if(values){
                    Modal.success({
                        title:"开通成功",
                        content: ""
                    })
                }
              })
              //获取值失败
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          }}
        >
            <Form form={form}></Form>
            </Modal>
    )
}
export default Order