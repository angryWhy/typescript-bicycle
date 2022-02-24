import { Form, Modal, Input } from 'antd';
import React, { memo } from 'react'
import { ItemType, AntdType } from '../../Common/BaseTable(工程化)/index';
import HeadCpn from '../../Common/BaseTable(工程化)/Head-Cpn/index';
interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}
const CreateUser: React.FC<CollectionCreateFormProps> = memo(({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const formList :ItemType[] = [
        {
            type:AntdType.INPUT,
            label:"姓名",
            placeholder:"请输入姓名",
            name:"user_name"
        },
        {
            type:AntdType.RADIO,
            label:"性别",
            name:"user_sex"
        },
        {
            type:AntdType.SELECT,
            label:"状态",
            option:[
                {
                    value:"1",
                    text:"男"
                },
                {
                    value:"2",
                    text:"女"
                }
            ],
            name:"user_status"
        },
        {
            type:AntdType.DATEPICK,
            label:"生日",
            name:"birthday"
        },
        {
            type:AntdType.TEXTAREA,
            label:"详细地址",
            name:"user_address"
        }
    ]
    return (
        <div>
            <Modal title="创建员工" visible={visible} onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                
                    <HeadCpn FormList={formList} form={form} />
                
            </Modal>
        </div>
    )
})

export default CreateUser