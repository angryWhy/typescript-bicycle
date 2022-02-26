import { DatePicker, Form, Input, Modal, Radio, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { memo, useRef } from 'react'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import { FormInstance } from 'antd/es/form/Form';
interface CreateProps {
  getCreateData: (value: any) => void,
  visible:boolean,
  setShow:Function
}
const { Option } = Select
const Create: React.FC<CreateProps> = memo(({getCreateData,visible,setShow}) => {
  const formRef = useRef<FormInstance>(null)
  const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  }
  const handleOk = () => {
    //对象可能为 "null",使用!
    const value = formRef.current!.getFieldsValue()
    getCreateData(value)
    setShow(false)
  }
  return (
  
      <Modal title="创建用户" 
             okText="提交" 
             cancelText="取消" 
             onCancel={e=>{setShow(false)}}
             onOk={e => { handleOk() }} 
             visible={visible}>
        <Form autoComplete="off" ref={formRef} >
          <Form.Item label="用户名" {...formLayout} name="username" >
            <Input type="text" placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item label="性别" {...formLayout} name="sex" >
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="状态" {...formLayout} name="status" >
            <Select>
              <Option value={1} >开启</Option >
              <Option value={2} >关闭</Option >
            </Select>
          </Form.Item>
          <Form.Item label="生日" {...formLayout} name="birth" >
            <DatePicker locale={locale} />
          </Form.Item>
          <Form.Item label="联系地址 "  {...formLayout} name="address" >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
  
  )
})

export default Create