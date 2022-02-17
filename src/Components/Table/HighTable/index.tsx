import React, { memo } from 'react'
import { Card, Table, Spin, Button, Modal } from 'antd'
import { ColumnsType } from 'antd/lib/table'
interface HighProps {

}
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
interface Data2 extends Data {
  age:number
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
  }
]
const data2: Data2[] = [
  {
    id: "0",
    userName: "Jack",
    sex: "1",
    state: "1",
    interest: "1",
    birthday: "2000-1-12",
    address: "candan",
    time: "8:00",
    key: 1,
    age:18
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
    key: 2,
    age:12
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
    key: 3,
    age:20
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
    key: 4,
    age:15
  }
]
const HighTable: React.FC<HighProps> = memo(() => {
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
  const columns2: ColumnsType<Data> = [
    {
      title: "id",
      dataIndex: "id",
      key: 0,
      fixed:"left"
    },
    {
      title: "姓名",
      dataIndex: "userName",
      key: 1,
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
  const columns3: ColumnsType<Data2> = [
    {
      title: "id",
      dataIndex: "id",
      key: 0,
    },
    {
      title: "姓名",
      dataIndex: "userName",
      key: 1,
    },
    {
      title:"年龄",
      dataIndex:"age",
      sorter: (a, b) => a.age - b.age,
      key:2
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: 3,
      render(sex: string) {
        return sex === "1" ? "男" : "女"
      }
    },
    {
      title: "状态",
      dataIndex: "state",
      key: 4,
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
      key: 5
    },
    {
      title: "生日",
      dataIndex: "birthday",
      key: 6
    },
    {
      title: "地址",
      dataIndex: "address",
      key: 7
    },
    {
      title: "时间",
      dataIndex: "time",
      key: 8
    }
  ]
  const handleDelete= (e:MouseEvent,item:Data) =>{
    Modal.info({
      title:"删除",
      content:`id:${item.id}`
    })
  }
  const columns4: ColumnsType<Data2> = [
    {
      title: "id",
      dataIndex: "id",
      key: 0,
    },
    {
      title: "姓名",
      dataIndex: "userName",
      key: 1,
    },
    {
      title:"年龄",
      dataIndex:"age",
      sorter: (a, b) => a.age - b.age,
      key:2
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: 3,
      render(sex: string) {
        return sex === "1" ? "男" : "女"
      }
    },
    {
      title: "状态",
      dataIndex: "state",
      key: 4,
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
      key: 5
    },
    {
      title: "生日",
      dataIndex: "birthday",
      key: 6
    },
    {
      title: "地址",
      dataIndex: "address",
      key: 7
    },
    {
      title: "时间",
      dataIndex: "time",
      key: 8
    },
    {
      title:"删除",
      render(text,item){
        return(<Button onClick={(e)=>{handleDelete(text,item)}} type="link">删除</Button>)
      }
    }
  ]
  return (
    <div>
      <Card title="头部固定表格">
        <Table<Data> dataSource={data} columns={columns} scroll={{ y: 100 }} pagination={{ pageSize: 2 }} />
      </Card>
      <Card title="左侧固定表格">
        <Table<Data> dataSource={data} columns={columns2} scroll={{ x: 2400 }} pagination={{ pageSize: 2 }} />
      </Card>
      <Card title="动态排序表格">
        <Table<Data2> dataSource={data2} columns={columns3} />
      </Card>
      <Card title="操作表格">
        <Table<Data2> dataSource={data2} columns={columns4} />
      </Card>
    </div>
  )
})

export default HighTable