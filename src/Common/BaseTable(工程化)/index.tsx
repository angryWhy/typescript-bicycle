import { ColumnsType } from 'antd/es/table/Table'
import React, { memo,  useState } from 'react'
import { useAxios } from '../../utils/useAxios'
import ContentCpn from './Content-Cpn'
import HeadCpn from './Head-Cpn'
export enum AntdType {
  INPUT = "INPUT",
  SELECT = "SELECT",
  CHECKBOX = "CHECKBOX",
  DATEPICK = "DATEPICK",
  BUTTON = "BUTTON",
  RADIO = "RADIO",
  TEXTAREA = "TEXTAREA"
}
interface BaseTableProps {

}
//定义Select的Option类型
export type OptionType = {
  value: number | string,
  text: string
}
//FormList的每一项的类型
export interface ItemType {
  type: string,
  label?: string,
  //传入到封装组件，当做key值
  name?: string,
  placeholder?: string,
  width?: string,
  option?: OptionType[],
  buttonText?: string,
}
//请求数据list的每一项的类型
export interface Data {
  order_id: string,
  bike_id: string,
  user_id: string,
  user_name: string,
  phone: number,
  way: number,
  time: number,
  status: number,
  start_time: string,
  end_time: string,
  pay: number,
  the_par: number
}
const columns: ColumnsType<Data> = [
  {
    title: "id",
    dataIndex: "order_id",
    key: 0
  },
  {
    title: "单车编号",
    dataIndex: "bike_id",
    key: 1
  },
  {
    title: "用户编号",
    dataIndex: "user_id",
    key: 2
  },
  {
    title: "用户名称",
    dataIndex: "user_name",
    key: 3
  },
  {
    title: "手机号",
    dataIndex: "phone",
    key: 4
  },
  {
    title: "里程",
    dataIndex: "way",
    key: 5
  },
  {
    title: '行驶时间',
    dataIndex: "time",
    key: 6
  },
  {
    title: "状态",
    dataIndex: "status",
    key: 7
  },
  {
    title: "开始时间",
    dataIndex: "start_time",
    key: 8
  },
  {
    title: "结束时间",
    dataIndex: "end_time",
    key: 9
  },
  {
    title: "应付金额",
    dataIndex: "pay",
    key: 10
  },
  {
    title: "实付金额",
    dataIndex: "the_pay",
    key: 11
  }
]
const BaseTable: React.FC<BaseTableProps> = memo(() => {
  const [data, setData] = useState<Data[]>()
  const [loading, setLoading] = useState(true)
  useAxios("./api/order/list.json", setData, "order", setLoading)
  const columns: ColumnsType<Data> = [
    {
      title: "id",
      dataIndex: "order_id",
      key: 0
    },
    {
      title: "单车编号",
      dataIndex: "bike_id",
      key: 1
    },
    {
      title: "用户编号",
      dataIndex: "user_id",
      key: 2
    },
    {
      title: "用户名称",
      dataIndex: "user_name",
      key: 3
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: 4
    },
    {
      title: "里程",
      dataIndex: "way",
      key: 5
    },
    {
      title: '行驶时间',
      dataIndex: "time",
      key: 6
    },
    {
      title: "状态",
      dataIndex: "status",
      key: 7
    },
    {
      title: "开始时间",
      dataIndex: "start_time",
      key: 8
    },
    {
      title: "结束时间",
      dataIndex: "end_time",
      key: 9
    },
    {
      title: "应付金额",
      dataIndex: "pay",
      key: 10
    },
    {
      title: "实付金额",
      dataIndex: "the_pay",
      key: 11
    }
  ]
  const FormList: Array<ItemType> = [
    {
      type: AntdType.CHECKBOX,
      label: "城市",
      name: "city",
      width: "200px",
      option: [
        {
          value: 0,
          text: "杭州"
        },
        {
          value: 1,
          text: "北京"
        },
        {
          value: 2,
          text: "上海"
        }
      ]
    },
    {
      type: AntdType.CHECKBOX,
      label: "订单状态",
      name: "order_list",
      width: "200px",
      option: [
        {
          value: 0,
          text: "全部"
        },
        {
          value: 1,
          text: "进行中"
        },
        {
          value: 2,
          text: "结束"
        }
      ]
    },
    {
      type: AntdType.DATEPICK,
      name: "time",
      label: "订单时间"
    },
    {
      type: AntdType.BUTTON,
      buttonText: "查询"
    },
    {
      type: AntdType.BUTTON,
      buttonText: "重置",
      width: "20px"
    }
  ]
  return (
    // 子组件定义了可选getData,获取子组件状态
    <div>
      <HeadCpn FormList={FormList} />
      <ContentCpn columns={columns} 
                  dataSource={data!}
                  type="radio"
                  loading={loading}
                   />
    </div>
  )
})

export default BaseTable