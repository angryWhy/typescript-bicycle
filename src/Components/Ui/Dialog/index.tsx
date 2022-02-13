import { Card, Button, Modal } from 'antd'
import React, { memo, useState } from 'react'

interface AlertProps {

}

const Alert: React.FC<AlertProps> = memo(() => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isModalVisible2, setIsModalVisible2] = useState<boolean>(false);
    const [isModalVisible3, setIsModalVisible3] = useState<boolean>(false);
    const [loading, setLoading] = useState(false)
    const { confirm } = Modal;
    function info() {
        Modal.info({
            title: "这是提醒",
            content: (
                <div>
                    <p>message-aboutsome messages...some messages...</p>
                    <p>message-aboutsome messages...some messages...</p>
                </div>
            ),
            onOk() { }
        })
    }
    function success() {
        Modal.success({
            title: "成功",
            content: (
                <div>
                    <p>message-aboutsome messages...some messages...</p>
                    <p>message-aboutsome messages...some messages...</p>
                </div>
            ),
            onOk() { }
        })
    }
    function errorabout() {
        Modal.error({
            title: "警告",
            content: (
                <div>
                    <p>message-aboutsome messages...some messages...</p>
                    <p>message-aboutsome messages...some messages...</p>
                </div>
            ),
            onOk() { }
        })
    }
    function alertabout() {
        Modal.warning({
            title: "警告",
            content: (
                <div>
                    <p>message-aboutsome messages...some messages...</p>
                    <p>message-aboutsome messages...some messages...</p>
                </div>
            )
        })
    }
    const handleOk = () => {
        setIsModalVisible(false)
    }
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    return (
        <div>
            <Card title="信息确认框">
                <Button type="primary" onClick={info} >提醒</Button>
                <Button type="primary" onClick={success} style={{ marginLeft: "20px" }}>成功</Button>
                <Button type="primary" onClick={errorabout} style={{ marginLeft: "20px" }}>错误</Button>
                <Button type="primary" onClick={alertabout} style={{ marginLeft: "20px" }}>警告</Button>
            </Card>
            <Card title="基础模态框">
                <Button type="primary" onClick={e => setIsModalVisible(true)}>打开弹窗</Button>
                <Button type="primary" onClick={e => setIsModalVisible2(true)} style={{ marginLeft: "20px" }}>自定义页脚</Button>
                <Button type="primary" onClick={e => setIsModalVisible3(true)} style={{ marginLeft: "20px" }}>垂直居中</Button>
            </Card>
            <Modal visible={isModalVisible}
                title="打开弹窗"
                onOk={handleOk}
                onCancel={handleCancel}>
                <p>message-about</p>
                <p>message-about</p>
                <p>message-about</p>
            </Modal>
            <Modal
                visible={isModalVisible2}
                title="自定义页脚"
                onOk={e=>{setIsModalVisible2(false)}}
                onCancel={e=>setIsModalVisible2(false)}
                footer={[
                    <Button key="back" onClick={e => { }}>
                        返回
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={e => { }}>
                        提交
                    </Button>,
                    <Button
                        key="link"
                        href="https://google.com"
                        type="primary"
                        loading={loading}
                        onClick={e => { }}
                    >
                        搜索
                    </Button>,
                ]}>

            </Modal>
            <Modal
                visible={isModalVisible3}
                title="垂直居中"
                onOk={e=>{setIsModalVisible3(false)}}
                onCancel={e=>setIsModalVisible3(false)}
                footer={[
                    <Button key="back" onClick={e => { }}>
                        返回
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={e => { }}>
                        提交
                    </Button>,
                    <Button
                        key="link"
                        href="https://google.com"
                        type="primary"
                        loading={loading}
                        onClick={e => { }}
                    >
                        搜索
                    </Button>,
                ]}>
                    <p>
                    wrapClassName-对话框外层容器的类名
                    </p>
            </Modal>
        </div>
    )
})

export default Alert