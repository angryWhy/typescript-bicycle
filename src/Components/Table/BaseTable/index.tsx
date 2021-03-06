import React, {memo, useState } from 'react'
import { Card, Table, Spin, Button, Modal } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { LoadingOutlined } from '@ant-design/icons';
import { useAxios } from '../../../utils/useAxios';
interface TableProps {

}
type Params = Omit<React.Key,"string">
type Data = {
  id: string,
  userName: string,
  sex: string,
  state: string,
  interest: string,
  birthday: string,
  address: string,
  time: string,
  key: React.Key
}
const data: Data[] = [
  {
    id: "0",
    userName: "Jack",
    sex: "1",
    state: "1",
    interest: "1",
    birthday: "2000-1-12",
    address: "candan",
    time: "8:00",
    key: 1
  },
  {
    id: "1",
    userName: "Lily",
    sex: "2",
    state: "1",
    interest: "1",
    birthday: "2005-11-1",
    address: "Japan",
    time: "9:00",
    key: 2
  },
  {
    id: "3",
    userName: "Dany",
    sex: "2",
    state: "1",
    interest: "1",
    birthday: "1999-10-5",
    address: "Koera",
    time: "6:00",
    key: 3
  },
  {
    id: "4",
    userName: "Liming",
    sex: "1",
    state: "1",
    interest: "1",
    birthday: "2000-8-8",
    address: "China",
    time: "7:00",
    key: 4
  },

]
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const BaseTable: React.FC<TableProps> = memo(() => {
  const [data2, setData] = useState()
  const [loading, setLoading] = useState<boolean>(false)
  //
  const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[] >()
  const [selectedRows, setselectedRows] = useState<Data[]|Data>()
//
  const [selectedRowKeys_Check, setselectedRowKeys_Check] = useState<React.Key[]|React.Key >()
  const [selectedRows_Check, setselectedRows_Check] = useState<Data[]|Data>()
  //
  const [page, setPage] = useState<number>()
  useAxios("./api/table/list.json", setData, "list", setLoading)
  const columns: ColumnsType<Data> = [
    {
      title: "id",
      dataIndex: "id",
      key: 0
    },
    {
      title: "姓名",
      dataIndex: "userName",
      key: 1
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: 2,
      render(sex: string) {
        return sex === "1" ? "男" : "女"
      }
    },
    {
      title: "状态",
      dataIndex: "state",
      key: 3,
      render(state: string) {
        let config: { [key: string]: string } = {
          "1": "求职",
          "2": "创业"
        }
        return config[state]
      }
    },
    {
      title: "兴趣",
      dataIndex: "interest",
      key: 4
    },
    {
      title: "生日",
      dataIndex: "birthday",
      key: 5
    },
    {
      title: "地址",
      dataIndex: "address",
      key: 6
    },
    {
      title: "时间",
      dataIndex: "time",
      key: 7
    }
  ]
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Data[] |Data) => {
      console.log("onChange事件触发");
      
      setselectedRowKeys(selectedRowKeys)
      setselectedRows(selectedRows)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      console.log(selectedRowKeys);
      
    },
    selectedRowKeys
  }

  const rowSelection_Checkbox = {
    onChange: (selectedRowKeys: React.Key[] |  React.Key , selectedRows: Data[] |Data) => {
      console.log("onChange事件触发-复选框");
      
      setselectedRowKeys_Check(selectedRowKeys)
      setselectedRows_Check(selectedRows)
      console.log(`复选框-selectedRowKeys: ${selectedRowKeys}`, '复选框-selectedRows: ', selectedRows);
      console.log(selectedRowKeys);
      
    },
    selectedRowKeys_Check
  }
  const handleDelete = ()=>{
    Modal.info({
      title:"删除信息",
      content:`${selectedRowKeys},${selectedRows}`
    })
    console.log(`${selectedRowKeys}`,selectedRows);
    
  }
  const pagination = (data:any,callback:Function) =>{
    return{
        // onChange:(page:number)=>{
        //     callback(page)
        // },
        // current:data.data.result.page,
        // pageSize:data.data.result.page_size,
        // total:data.data.result.total,
        // showTotal:()=>{
        //     return`总条数${data.data.result.total}`
        // },
        // showQuickJumper:true
    }
   
}
  return (
    <div>
      <Card title="基础表格">
        <Table<Data> dataSource={data} columns={columns} />
      </Card>
      <Card title="动态表格">
        <Spin spinning={loading} indicator={antIcon}>
          <Table dataSource={data2} columns={columns} />
        </Spin>
      </Card>
      <Card title="单选动态表格">
        <Spin spinning={loading} indicator={antIcon}>
        <div>
          <Button type='primary' onClick={e=>{handleDelete()}}>删除</Button>
        </div>
          <Table dataSource={data2}
            columns={columns}
            rowSelection={{
              type: "radio",
              ...rowSelection,
            }}
            onRow={(record,index) => {
            //onRow，的index从0开始计算
              return {
                onClick:e=>{
                  let asIndex = [index as number]
                 
                  // setselectedRowKeys([a])
                  // setselectedRows(record)
                  // console.log("行单击",selectedRowKeys);
                  rowSelection.onChange(asIndex,record)
                  
                }
              }
            }
            }
            pagination={pagination(page,(page:number)=>{setPage(page)})}
          />
        </Spin>
      </Card>
      <Card title="复选动态表格">
        <Spin spinning={loading} indicator={antIcon}>
          <Table dataSource={data2}
            columns={columns}
            rowSelection={{
              type: "checkbox",
              ...rowSelection_Checkbox,
            }}
            onRow={(record,index) => {
            //onRow，的index从0开始计算
              return {
                onClick:e=>{
                  
                 let asIndex = index!
                  // setselectedRowKeys([a])
                  // setselectedRows(record)
                  // console.log("行单击",selectedRowKeys);
                  rowSelection_Checkbox.onChange(asIndex,record)
                  
                }
              }
            }
            }
          />
        </Spin>
      </Card>
    </div>
  )
})

export default BaseTable