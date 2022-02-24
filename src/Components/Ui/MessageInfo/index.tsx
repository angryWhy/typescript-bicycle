import React, { memo } from 'react'
import { message, Button, Space } from 'antd';
import { title } from 'process';
interface MessageProps {

}
const Messageinfo: React.FC<MessageProps> = memo(() => {
    const success = () => {
        message.success('This is a success message');
    };

    const error = () => {
        message.error('This is an error message');
    };

    const warning = () => {
        message.warning('This is a warning message');
    };
    const info = () => {
        message.info('This is a normal message');
      };
    const messageAll = <T extends object,K extends keyof T> (message:T,key:K) => {
        (message as any)[key]({
            title:"1",
            content:"2"
        })
    }
    return (
        <div>
            <Space>
                <Button onClick={success}>Success</Button>
                <Button onClick={error}>Error</Button>
                <Button onClick={warning}>Warning</Button>
                <Button type="primary" onClick={info}>
                    Display normal message
                </Button>
                <Button type="primary" onClick={e=>{messageAll(message,"info")}}>
                    Display normal message
                </Button>
            </Space>
        </div>
    )
})

export default Messageinfo