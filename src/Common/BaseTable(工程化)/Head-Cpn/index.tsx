import React, { memo } from 'react'

import { Select, Form } from 'antd'

import { ItemType } from '..'
import { AntdType, OptionType } from '../index';
interface HeadProps {
    FormList: ItemType[]
}
const {Option} = Select
const HeadCpn: React.FC<HeadProps> = memo(({ FormList }) => {
    const renderForm = (FormList: ItemType[]) => {
        const List = FormList.map((item: ItemType, index: number) => {
            if (item.type === AntdType.CHECKBOX) {
                return(
                    <Form.Item label={item.label} name={item.name} key={item.name} style={{width:item.width}} >
                    <Select>
                        {
                            item.option? renderOption(item.option) : null
                        }
                    </Select>
                    </Form.Item>
                )
            }
        });
        return List
    }
    const renderOption = (list : OptionType []) =>{
     const OptionList = list.map((item : OptionType,index)=>{
         return <Option value={item.value} key={index}>{item.text}</Option>
        })
        return OptionList
    }
    return (
        <div>
            <Form>
                {
                    renderForm(FormList)
                }
            </Form>
        </div>
    )
})

export default HeadCpn