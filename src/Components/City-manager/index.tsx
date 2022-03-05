import { Row, Form, Select, Col, Button, Card, Table, Spin,Modal, FormInstance, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React, { memo, useState,forwardRef,useRef} from 'react'
import { useAxios } from '../../utils/useAxios';
import { ColumnsType } from 'antd/es/table';
interface CityProps {

}
interface SubPros {
    setSubData:Function
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
//Collection的type
interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
  }
interface Values {
    title: string;
    description: string;
    modifier: string;
  }
const { Option } = Select
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const CityCpn: React.FC<CityProps> = memo(() => {
    const [data, setData] = useState<City[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [subShow, setSubShow] = useState<boolean>(false)
    const subRef = useRef<FormInstance>()
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
    //Form表单取值
    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        setSubShow(false);
      }
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
                    <Button type='primary' onClick={e=>{setSubShow(true)}}>开通城市</Button>
                    <Table<City> columns={columns} dataSource={data} />
                </Spin>
        </Card>
        <CollectionCreateForm visible={subShow} onCreate={onCreate} onCancel={()=>{setSubShow(false)}}/>
        </div>
    )
})
const CollectionCreateForm :React.FC<CollectionCreateFormProps>  =({
    visible,
    onCreate,
    onCancel,
  })=>{
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
            <Form form={form}>
                <Form.Item label="选择城市" name="城市">
                <Select>
                    <Option value={1}>天津</Option>
                    <Option value={2}>河北</Option>
                </Select>
                </Form.Item>
                <Form.Item label="运营模式" name="mode">
                <Select >
                    <Option value={1}>运营模式</Option>
                    <Option value={2}>用车模式</Option>
                </Select>
                </Form.Item>
                <Form.Item label="用车模式" name="bicycle">
                <Select >
                    <Option value={1}>停车点</Option>
                    <Option value={2}>禁停区</Option>
                </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default CityCpn