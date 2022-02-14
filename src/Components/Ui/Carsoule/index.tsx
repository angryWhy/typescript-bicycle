import React, { memo } from 'react'
import { Carousel, Card } from 'antd';
import fir from "../../../Assets/Img/1.jpg"
import sec from "../../../Assets/Img/2.jpg"
import thr from "../../../Assets/Img/3.jpg"
import fou from "../../../Assets/Img/4.jpg"
import fif from "../../../Assets/Img/5.jpg"
interface CarProps {

}
const CarSoule: React.FC<CarProps> = memo(() => {
    const onChange = () => {
        console.log();
    }
    return (
        <div>
            <Card title="基本用法">
                <Carousel afterChange={e => { onChange() }} autoplay>
                    <div>
                        <img src={fir} alt='' />
                    </div>
                    <div>
                        <img src={sec} alt='' />
                    </div>
                    <div>
                        <img src={thr} alt='' />
                    </div>
                    <div>
                        <img src={fou} alt='' />
                    </div>
                    <div>
                        <img src={fif} alt='' />
                    </div>
                </Carousel>
            </Card>
            <Card title="渐变">
                <Carousel afterChange={e => { onChange() }} autoplay effect="fade">
                    <div>
                        <img src={thr} alt='' />
                    </div>
                    <div>
                        <img src={fou} alt='' />
                    </div>
                    <div>
                        <img src={fif} alt='' />
                    </div>
                    <div>
                        <img src={fir} alt='' />
                    </div>
                    <div>
                        <img src={sec} alt='' />
                    </div>
                </Carousel>
            </Card>
        </div>
    )
})

export default CarSoule