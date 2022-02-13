import React, { memo, useState } from 'react'
import { Card, Spin, Space, Alert, Button } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
interface LoadProps {

}
const Load: React.FC<LoadProps> = memo(() => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    const [loading, setLoading] = useState(false)
    return (
        <div>
            <Card title="基础Spin">
                <Space size="middle">
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />
                </Space>
            </Card>
            <Card title="内容遮罩">
                <Spin spinning={loading}>
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin>
                <Button onClick={e => { setLoading(!loading) }} style={{ margin: "20px 0" }}>
                    切换
                </Button>
                <Spin tip="加载中">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin>
                <Spin tip="加载中" indicator={antIcon}>
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin>
            </Card>
        </div>
    )
})

export default Load