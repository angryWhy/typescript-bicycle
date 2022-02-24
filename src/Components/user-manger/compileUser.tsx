import { Checkbox, DatePicker, Form, Input, Modal, Radio, Select } from 'antd'
import React, { memo, useRef } from 'react'
import { Data } from '.';
import { FormInstance } from 'antd/es/form/Form';
import moment from 'moment';
interface Values {
    title: string;
    description: string;
    modifier: string;
}
interface CompilerProps {
    visible: boolean,
    onCreate: (values: Values) => void,
    onCancel: () => void,
    selectedRows: Data[] | Data
}
const { Option } = Select
const { TextArea } = Input
const CompileUser: React.FC<CompilerProps> = memo(({ visible, onCancel, onCreate, selectedRows }) => {
    const formRef = useRef<FormInstance>(null)
    const [form] = Form.useForm();
    if (visible === true && selectedRows) {
        const item = Object.assign({}, selectedRows as Data)
        //使用ref，动态初始化，不同步
        //使用form的hook就可以同步
        //???
        const time = moment(item.birthday, 'YYYY-MM-DD')
        form.setFieldsValue({
            user_name: item.userName,
            sex: item.sex.toString(),
            state: item.state.toString(),
            birthday: time,
            address: item.address
        })
        // formRef.current?.setFieldsValue({
        //     user_name:"1111"
        // })
    }

    return (
        <Modal
            visible={visible}
            title="编辑员工"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    //表单验证
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);

                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}>
            <Form labelCol={{ span: 5 }} form={form} ref={formRef}>
                <Form.Item label="用户名" name="user_name">
                    <Input />
                </Form.Item>
                <Form.Item label="性别" name="sex">
                    <Radio.Group>
                        <Radio value="1">男</Radio>
                        <Radio value="2">女</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="状态" name="state">
                    <Select>
                        <Option value="1">工作</Option>
                        <Option value="2">学习</Option>
                        <Option value="3">运动</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="生日" name="birthday">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="联系地址" name="address">
                    <TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default CompileUser