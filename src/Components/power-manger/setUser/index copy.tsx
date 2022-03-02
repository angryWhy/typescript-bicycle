import { Form, Input, Modal, Transfer } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import { useAxios } from '../../../utils/useAxios';
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

type RoleType = { user_id: string; user_name: string; status: number; }[]
type transferType = { key: string; title: string; status: number;}[]
//去除类型
type filterParamsType =Exclude<UnionType,transferType>
//30行，对数据进行添加属性
type UnionType = Partial<RoleType> & transferType
const SetUser: React.FC<SetUserProps> = memo(({ getCompilerData, visible, setShow }) => {
  const [form] = Form.useForm()
  const [mockData, setMockData] = useState<UnionType>()
  const [targetKey, setTargetKey] = useState<string[]>()
  useAxios("./api/role/user_list.json", setMockData, "transfer",)
  const getAuthUserList = (dataSource: RoleType) => {
    const dataList : UnionType = []
    const targetkeys = []
    if (dataSource && dataSource.length > 0) {
      for (let i = 0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: `${dataSource[i].user_name}`,
          status: dataSource[i].status,
        }
        if (data.status === 1) {
          targetkeys.push(data.key)
        }
        dataList.push(data)
      }
    }
    setMockData(dataList)
    setTargetKey(targetkeys)
  }
  useEffect(() => {
    if(visible){
      getAuthUserList(mockData as filterParamsType)
    } 
  }, [visible,])

  return (
    <div>
      <Modal visible={visible} okText="确定" cancelText="取消" onCancel={e => { setShow(false) }} title="用户授权">
        <Form form={form}>
          <Form.Item>
            <Input disabled />
          </Form.Item>
          <Transfer dataSource={mockData}
            titles={["待选用户", "已选用户"]}
            showSearch targetKeys={targetKey}
            render={item => item.title}
            onChange={(targetKeys) => {setTargetKey(targetKeys)}}
          />
        </Form>
      </Modal>
    </div>
  )
})
export default SetUser