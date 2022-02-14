import React, { memo } from 'react'
import { Card, Button, notification, Space } from 'antd';
import { NotificationApi, NotificationPlacement } from 'antd/lib/notification';
interface MessageProps {
}
interface notificationExtra extends NotificationApi{
  
}
const All: React.FC<MessageProps> = memo(() => {
  const openNotification = () => {
    notification.open({
      message: '提醒标题',
      description:
        '这里为描述内容',
      onClick: () => {
        console.log('单击触发的回调');
      },
    });
  }
  const openNotification2 = () => {
    const key = `open${Date.now()}`;
    const btn = (<Button type='primary' onClick={() => notification.close(key)}>确认</Button>)
    notification.open({
      message: '提醒标题',
      description:
        '这里为描述内容',
      onClick: () => {
        console.log('单击触发的回调');
      },
      btn,
      key
    });
  }
  const openNotification3 = (pos: string) => {
    const placement = pos as NotificationPlacement
    notification.info({
      message: `Notification ${pos}`,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement,
    });
  }; 
  const openNotificationWithIcon = (type:string) => {
    notification.success({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  return (
    <div>
      <Card title="通知提醒框">
        <Button type="primary" onClick={openNotification}>
          打开提醒
        </Button>
        <Button type="primary" onClick={openNotification2} style={{ marginLeft: "20px" }}>
          自定义页脚
        </Button>,
      </Card>
      <Card title="不同位置">
        <Space>
          <Button type="primary" onClick={() => openNotification3('topLeft')}>

            topLeft
          </Button>
          <Button type="primary" onClick={() => openNotification3('topRight')}>

            topRight
          </Button>
        </Space>
      </Card>
      <Card title="不同状态">
        <Space>
          <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
          <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
          <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
          <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
        </Space>
      </Card>
    </div>
  )
})

export default All