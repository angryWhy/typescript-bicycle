import { Form, Input, Modal } from 'antd'
import React, { memo } from 'react'
interface SetUserProps {
  getCompilerData: (value: any) => void,
  visible: boolean,
  setShow: Function,
  //form表单相关项
  onCreate: (values: Values) => void;
  onCancel: Function;
}
interface Values {
  title: string;
  description: string;
  modifier: string;
}
const SetUser: React.FC<SetUserProps> = memo(({ getCompilerData, visible, setShow }) => {
  const [form] = Form.useForm()
  return (
    <div>
      <Modal visible={visible} okText="确定" cancelText="取消" onCancel={e => { setShow(false) }} title="用户授权">
        <Form form={form}>
          <Form.Item>
            <Input disabled/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
})
export default SetUser