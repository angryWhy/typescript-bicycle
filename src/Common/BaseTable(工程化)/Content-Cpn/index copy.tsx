import { LoadingOutlined } from '@ant-design/icons'
import { Card, Spin, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/Table'
import React, { memo, useState } from 'react'
import { Data } from '..'
import { User } from '../../../Components/power-manger/index';
interface ContentProps {
  columns: any
  dataSource: Data[],
  type: "checkbox" | "radio",
  loading:boolean,
  getData?:()=>void
}


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const ContentCpn: React.FC<ContentProps> = memo(({ columns, dataSource, type,loading }) => {
  //Table表单相关项
  const [selectedRowKeys, setselectedRowKeys] = useState<React.Key[]>()
  const [selectedRows, setselectedRows] = useState<Data[] | Data>()
  const rowSelection = {
    type: type,
    onChange: (selectedRowKeys: React.Key[], selectedRows: Data[] | Data ) => {
      console.log("onChange事件触发");
      setselectedRowKeys(selectedRowKeys)
      setselectedRows(selectedRows)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      console.log(selectedRowKeys);

    },
    selectedRowKeys
  }

  return (
    <Card>
      <Spin spinning={loading} indicator={antIcon}>
        <Table columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelection}
          onRow={(record, index) => {
            //onRow，的index从0开始计算
            return {
              onClick: e => {
                let asIndex = [index as number]
                rowSelection.onChange(asIndex, record)

              }
            }
          }
          }
        />
      </Spin>
    </Card>
  )
})

export default ContentCpn