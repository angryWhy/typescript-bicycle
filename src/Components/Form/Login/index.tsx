import { Form, Input, Button, Checkbox, Card } from 'antd';
import React, { memo } from 'react'
interface LoginProps {

}
const Login: React.FC<LoginProps> = memo(() => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Card title="登录水平表单">
                <Form
                    name="basic"
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 10 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入账号' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 3, span: 4 }}>
                        <Checkbox>免登录</Checkbox>
                        <Button type="link" htmlType="button" onClick={e => { }}  >
                            忘记密码
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 3, span: 4 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title="行内表单">
                <Form
                    name="inline"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='inline'
                >
                    <Form.Item label="用户名">
                        <Input placeholder="账户名称" />
                    </Form.Item>
                    <Form.Item label="密码">
                        <Input placeholder="密码" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
})

export default Login