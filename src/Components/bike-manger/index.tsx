import { Card } from 'antd';
import React, { memo, useEffect, useState } from 'react'
import HeadCpn from '../../Common/BaseTable(工程化)/Head-Cpn'
import { ItemType, AntdType } from '../../Common/BaseTable(工程化)/index';
import { useAxios } from '../../utils/useAxios';
interface bikepProps {

}
const BikeMap :React.FC<bikepProps> = memo(() => {
    const [data, setData] = useState<any>()
    const [mapData, setMapData] = useState()
    useAxios("./api/map/bike_list.json", setMapData, "mapData")
    useEffect(() => {
        if (mapData) {
            renderMap(mapData)
        }
        console.log(mapData, "--------");

    }, [mapData])

    const formList: ItemType[] = [
        {
            type: AntdType.CHECKBOX,
            label: "城市",
            width: "150px",
            name: "city",
            option: [
                {
                    value: 1,
                    text: "杭州"
                },
                {
                    value: 2,
                    text: "北京"
                },
                {
                    value: 3,
                    text: "上海"
                }
            ]
        },
        {
            type: AntdType.DATEPICK,
            label: "开始时间",
            name: "start_time"
        },
        {
            type: AntdType.DATEPICK,
            label: "结束时间",
            name: "end_time"
        },
        {
            type: AntdType.CHECKBOX,
            width: "150px",
            label: "订单状态",
            name: "order_state",
            option: [
                {
                    value: 1,
                    text: "进行中"
                },
                {
                    value: 2,
                    text: "结束"
                }
            ]
        }
    ]
    console.log("bike地图的headCpn的数据", data);
    const renderMap = (data: any = mapData) => {
        let list = data.route_list
        let serlist = data.service_list
        let map = new window.BMapGL.Map("container")
        let gps1 = list[0].split(",")
        let startPonit = new window.BMapGL.Point(gps1[0], gps1[1])

        let gps2 = list[list.length - 1].split(",")
        let endPonit = new window.BMapGL.Point(gps2[0], gps2[1])

        //缩放控件

        let zoomCtrl = new window.BMapGL.ZoomControl();  // 添加缩放控件
        map.addControl(zoomCtrl)

        //居中
        map.centerAndZoom(endPonit, 15);
        let startIcon = new window.BMapGL.Icon("/map-png/start_point.png", new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })
        let endIcon = new window.BMapGL.Icon("/map-png/end_point.png", new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })
        let bikeMarker = new window.BMapGL.Marker(startPonit, { icon: startIcon })
        let bikeMarkerEnd = new window.BMapGL.Marker(endPonit, { icon: endIcon })
        map.addOverlay(bikeMarker)
        map.addOverlay(bikeMarkerEnd)

        //行车路线

        let routeList :{[key :number]:string}[]=[]
        list.forEach((item:string) => {
            let p = item.split(",")
            routeList.push(new window.BMapGL.Point(p[0], p[1]))
        });
        let pol = new window.BMapGL.Polyline(routeList, { strokeColor: "blue" })
        map.addOverlay(pol)



        //服务区
        let trackArea : string[]= [] 
        serlist.forEach((item:{lon:string,lat:string}) => {
            trackArea.push(new window.BMapGL.Point(item.lon, item.lat))
        });
        let gon = new window.BMapGL.Polygon(trackArea, { strokeColor: "blue", fillColor: "pink",strokeWeight:2, strokeOpacity: 0.2 })
        map.addOverlay(gon)

    }
    return (
        <div>
            <Card>
                <HeadCpn FormList={formList} getData={setData} />
            </Card>
            <Card>
                <div id='container' style={{ width: "600px", height: "500px", marginLeft: "150px" }}>

                </div>
            </Card>
        </div>
    )
})

export default BikeMap