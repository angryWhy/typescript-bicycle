import React, { memo,useState } from 'react'
import { Card, Modal } from 'antd';

const { Meta } = Card;
interface GalleryProps {

}
const Gallery: React.FC<GalleryProps> = memo(() => {
    const [show, setShow] = useState<boolean>(false)
    return (
        <div>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                onClick={e=>{setShow(true)}}
            >
                <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
            <Modal
            width={300}
            title="图片展示"
            visible={show}
            onCancel={e=>{setShow(false)}}
            footer={null}
            >
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={250}/>
            </Modal>
        </div>
    )
})

export default Gallery