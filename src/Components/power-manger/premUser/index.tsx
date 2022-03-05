import { DatePicker, Form, FormInstance, Input, Modal, Radio, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import React, { memo, useEffect, useRef, useState } from 'react'
import { User } from '../index';
import TreeCpn from './Tree/index';
interface PremissionProps {
  getTreeeData: (value: any) => void,
  visible: boolean,
  setShow: Function,
  detail:User[] | User,
}
const { Option } = Select
const Premission: React.FC<PremissionProps> = memo(({ getTreeeData, visible, setShow,detail}) => {
  const formRef = useRef<FormInstance>(null)
  const [treeShow, setTreeShow] = useState<boolean>(false)
  const details = detail as User
  const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  }
  const handleOk = () => {
    //对象可能为 "null",使用!
    const value = formRef.current?.getFieldsValue()
    formRef.current?.resetFields()
    getTreeeData(value)
    setShow(false)
  }  
  useEffect(() => {
    if(visible===true&&details){
    formRef.current?.setFieldsValue({
      name:details.role
    })
    setTreeShow(true)
  }
  }, [formRef,details,visible])
  
  return (

    <Modal title="用户授权"
      okText="提交"
      cancelText="取消"
      onCancel={e => { setShow(false);formRef.current?.resetFields();setTreeShow(false) }}
      onOk={e => { handleOk() ;setTreeShow(false)}}
      visible={visible}>
      <Form ref={formRef} >
        <Form.Item label="角色名称" {...formLayout} name="name">
          <Input disabled />
        </Form.Item>
        <Form.Item label="状态" {...formLayout} initialValue="2" name="control">
          <Select  >
            <Option value="1" >开启</Option >
            <Option value="2" >关闭</Option >
          </Select>
        </Form.Item>
        {treeShow&&<TreeCpn roleList = {detail}/>}
      </Form>
    </Modal>

  )
})

export default Premission