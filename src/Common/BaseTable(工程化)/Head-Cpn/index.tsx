import React, { memo, useRef } from 'react'

import { Select, Form, DatePicker, Button } from 'antd'

import { ItemType } from '..'
import { AntdType, OptionType } from '../index';

import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { FormInstance } from 'antd/es/form/Form';

interface HeadProps {
    FormList: ItemType[]
}
const { Option } = Select
const HeadCpn: React.FC<HeadProps> = memo(({ FormList }) => {
    const formRef = useRef<FormInstance>(null)
    const renderForm = (FormList: ItemType[]) => {
        const List = FormList.map((item: ItemType, index: number) => {
            if (item.type === AntdType.CHECKBOX) {
                return (
                    <Form.Item label={item.label} name={item.name} key={item.name} style={{ width: item.width }} >
                        <Select>
                            {
                                item.option ? renderOption(item.option) : null
                            }
                        </Select>
                    </Form.Item>
                )
            }
            if (item.type === AntdType.DATEPICK) {
                return (
                    <Form.Item label={item.label} name={item.name} key={item.name}>
                        <DatePicker locale={locale} />
                    </Form.Item>
                )
            }
            // if(item.type === AntdType.BUTTON){
            //     return(
            //         <Form.Item key={index}>
            //         <Button type='primary' style={{marginLeft : item.width}} onClick={e=>{console.log(formRef.current!.getFieldsValue());
            //         }}>{item.buttonText}</Button>
            //         </Form.Item>
            //     )
            // }
        });
        return List
    }
    const renderOption = (list: OptionType[]) => {
        const OptionList = list.map((item: OptionType, index) => {
            return <Option value={item.value} key={index}>{item.text}</Option>
        })
        return OptionList
    }
    return (
        <div>
            <Form layout='inline' ref={formRef}>
                {
                    renderForm(FormList)
                }
                <Form.Item>
                    <Button type='primary' style={{ marginLeft: "20px" }} onClick={e => {
                        formRef.current!.getFieldsValue();
                        console.log(formRef.current!.getFieldsValue());
                    }}>查询</Button>
                    <Button type='primary' style={{ marginLeft:  "20px" }} onClick={e => {
                        formRef.current!.resetFields()
                    }}>重置</Button>
                </Form.Item>
            </Form>
        </div>
    )
})

export default HeadCpn