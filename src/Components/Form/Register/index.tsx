import { Form, Input, Button, Checkbox, Card, Radio, InputNumber, Select, Switch, DatePicker, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';

import React, { memo, useState } from 'react'

interface RegProps {

}
const { Option } = Select;
const { TextArea } = Input
function getBase64(img: any, callback: Function) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const Register: React.FC<RegProps> = memo(() => {
    const [loading, setLoading] = useState<boolean>(false)
    const [imageUrl, setimageUrl] = useState()
    const [checkNick, setCheckNick] = useState<boolean>(false)
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl: any) => {
                setLoading(false)
                setimageUrl(imageUrl)
            }
            );
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 3 },
      };
    return (
        <div>
            <Card title="注册表单">
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
                    <Form.Item label="性别"
                        name="sex"
                        rules={[{ required: true, message: '请选择性别' }]}
                    >
                        <Radio.Group>
                            <Radio value="1">男</Radio>
                            <Radio value="2">女</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="年龄" name="age">
                        <InputNumber size="small" min={0} max={150} defaultValue={0} />
                    </Form.Item>
                    <Form.Item label="状态" name="status">
                        <Select style={{ width: 200 }}>
                            <Option value="jack">睡觉</Option>
                            <Option value="lucy">学习</Option>
                            <Option value="disabled" disabled>
                                健身
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="hobbies" label="国家">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="选择国籍"
                            defaultValue={['china']}
                            optionLabelProp="label"
                        >
                            <Option value="china" label="China">
                                <div className="demo-option-label-item">

                                    China (中国)
                                </div>
                            </Option>
                            <Option value="usa" label="USA">
                                <div className="demo-option-label-item">

                                    USA (美国)
                                </div>
                            </Option>
                            <Option value="japan" label="Japan">
                                <div className="demo-option-label-item">

                                    Japan (日本)
                                </div>
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="转换" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item label="日期" name="date">
                        <DatePicker onChange={e => { }} locale={locale} />
                    </Form.Item>
                    <Form.Item label="地址" name="address">
                        <TextArea rows={4} placeholder="输入地址" maxLength={50} />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 3, span: 4 }}>
                        <Checkbox>记住密码</Checkbox>
                        <Button type="link" htmlType="button" onClick={e => { }}  >
                            忘记密码
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 3, span: 4 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                    <Form.Item label="上传头像">
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item  {...formTailLayout}>
                        <Checkbox checked={checkNick} onChange={e => { setCheckNick(!checkNick) }}>
                            协议
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...formTailLayout}>
                        <Button type='primary' htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
})

export default Register