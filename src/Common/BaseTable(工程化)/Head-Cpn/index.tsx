import React, { memo, useRef } from 'react'

import { Select, Form, DatePicker, Button, Card, Input, Radio } from 'antd';

import { ItemType } from '..'
import { AntdType, OptionType } from '../index';

import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { FormInstance } from 'antd/es/form/Form';

interface HeadProps {
    FormList: ItemType[],
    //getData是使用这个组件定义的ref先获取到值，然后通过子传父传递到父组件，在取到值
    getData?:Function,
    form?:any
}
const { Option } = Select
const {TextArea} = Input
const HeadCpn: React.FC<HeadProps> = memo(({ FormList,form,getData }) => {
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
            if (item.type === AntdType.INPUT) {
                return (
                    <Form.Item label={item.label} name={item.name} key={item.name}>
                        <Input  placeholder={item.placeholder}/>
                    </Form.Item>
                )
            }
            if(item.type ===AntdType.RADIO){
                return(
                    <Form.Item label={item.label} name={item.name} key={item.name}>
                        <Radio.Group>
                            <Radio value="1">男</Radio>
                            <Radio value="2">女</Radio>
                        </Radio.Group>
                    </Form.Item>
                )
            }
            if(item.type ===AntdType.TEXTAREA){
                return(
                    <Form.Item label={item.label} name={item.name} key={item.name}>
                        <TextArea />
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
        <Card>
            <Form layout='inline' ref={formRef} form={form ? form:null}>
                {
                    renderForm(FormList)
                }
                <Form.Item>
                    <Button type='primary' style={{ marginLeft: "20px" }} onClick={e => {
                        formRef.current!.getFieldsValue();
                        console.log("HeadCpn.tsx,92行的LOG",formRef.current!.getFieldsValue());
                        getData!(formRef.current!.getFieldsValue())
                    }}>查询</Button>
                    <Button type='primary' style={{ marginLeft:  "20px" }} onClick={e => {
                        formRef.current!.resetFields()
                    }}>重置</Button>
                </Form.Item>
            </Form>
        </Card>
    )
})

export default HeadCpn