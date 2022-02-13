import { Button, Card } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, DownloadOutlined, PoweroffOutlined } from '@ant-design/icons';
import React, { memo, useReducer } from 'react'

enum ActionType {
    CHANGE_STATUS = "CHANGE_STATUS",
}

type State = {
    statusList: boolean[]
}

type Action = {
    type: string,
    index: number,
    status: boolean
}

interface ButtonProps {
    className?: string
}


const ButtonPage: React.FC<ButtonProps> = memo(() => {
    const initState = {
        statusList: [false, false, false, false]
    }
    const [state, dispatch] = useReducer(reducer, initState)
    function reducer(state: State, action: Action): State {
        const { type, status } = action
        switch (type) {
            case ActionType.CHANGE_STATUS:
                return {
                    ...state, statusList: state.statusList.map((item: boolean, index: number) => {
                        if (index === action.index) {
                            return item = status
                        }
                        else {
                            return item
                        }
                    })
                }
            default:
                return { ...state }
        }

    }
    const enterLoading = (index: number): void => {
        console.log(index);
        dispatch({ type: "CHANGE_STATUS", status: true, index: index })
        setTimeout(() => {
            dispatch({ type: "CHANGE_STATUS", status: false, index: index })
        }, 3000);
    }
    return (
        <div>
            <Card title="基础按钮">
                <Button type='primary'>A</Button>
                <Button style={{ marginLeft: "20px" }}>BLOOD</Button>
                <Button style={{ marginLeft: "20px" }} type="dashed">ATTEMPT</Button>
                <Button danger style={{ marginLeft: "20px" }} >TypeScript</Button>
            </Card>
            <Card title="图形按钮">
                <Button icon={<PlusOutlined />}>创建</Button>
                <Button icon={<EditOutlined />} style={{ marginLeft: "20px" }}>编辑</Button>
                <Button icon={<DeleteOutlined />} style={{ marginLeft: "20px" }}>编辑</Button>
                <Button shape="circle" icon={<SearchOutlined />} style={{ marginLeft: "20px" }} />
                <Button icon={<SearchOutlined />} style={{ marginLeft: "20px" }}>Search</Button>
                <Button icon={<DownloadOutlined />} style={{ marginLeft: "20px" }}>Download</Button>
            </Card>
            <Card title="Loading按钮">
                <Button type="primary" loading >Loading</Button>
                <Button type="primary" icon={<PoweroffOutlined />} loading style={{ marginLeft: "20px" }} />
                <Button type="primary" loading={state.statusList[0]} onClick={(e) => enterLoading(0)} style={{ marginLeft: "20px" }}>Loading-One</Button>
                <Button type="primary" loading={state.statusList[1]} onClick={(e) => enterLoading(1)} style={{ marginLeft: "20px" }}>Loading-Two</Button>
            </Card>
            <Card title="block按钮">
                <Button type="primary" block style={{ marginBottom: "20px" }}>
                    Primary
                </Button>
                <Button block style={{ marginBottom: "20px" }}>Default</Button>
                <Button type="dashed" block style={{ marginBottom: "20px" }}>
                    Dashed
                </Button>
                <Button type="link" block style={{ marginBottom: "20px" }}>
                    Link
                </Button>
            </Card>
        </div>
    )
})

export default ButtonPage