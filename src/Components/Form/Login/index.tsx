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

                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 10 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                    >
                        <Form.Item name="username" 
                        rules={[{ required: true, message: '请输入账号' }]}>
                            <Input />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                    >
                        <Form.Item name="password"  rules={[{ required: true, message: '请输入密码' }]}>
                            <Input.Password />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 3, span: 4 }}>
                        <Checkbox>免登录</Checkbox>
                        <Button type="link" htmlType="button" onClick={e => { }}  >
                            忘记密码
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 3, span: 4 }} name="">
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title="行内表单">
                <Form

                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='inline'
                >
                    <Form.Item label="用户名" >
                        <Form.Item name="user">
                            <Input placeholder="账户名称" />
                        </Form.Item>

                    </Form.Item>
                    <Form.Item label="密码" >
                        <Form.Item name="pass">
                            <Input />
                        </Form.Item>

                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 14 }} name="">
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