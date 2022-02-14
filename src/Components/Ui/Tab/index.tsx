import React, { memo, useState, useReducer } from 'react'
import { Tabs, Card } from 'antd';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
enum StateConstants {
    CHANGE = "CHANGE"
}
interface TabProps {

}
type Panes = {
    title: string,
    content: string,
    key: string,
    closable?: boolean
}
type Action = {
    type: string,
    List: Panes[]
}
interface State {
    panes: Panes[]
}
const Tabui: React.FC<TabProps> = memo(() => {
    const [activeKey, setActiveKey] = useState<string>()
    const initialPanes = [
        { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
        { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
        {
            title: 'Tab 3',
            content: 'Content of Tab 3',
            key: '3',
            closable: false,
        },
    ]
    const initstate = {
        panes: initialPanes
    }
    const [state, dispatch] = useReducer(reducer, initstate)
    function reducer(state: State, action: Action): State {
        switch (action.type) {
            case StateConstants.CHANGE:
                console.log(action.List);

                return { ...state, panes: action.List }
            default:
                return { ...state }
        }
    }
    const onChange = (activeKey: string) => {
        setActiveKey(activeKey)
    }
    const onEdit = (e: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,action:string) => {
        if(action==="add"){
            add()
        }
        
    }
    const add = () => {
        const { panes } = state;
        const activeKey = `newTab${panes.length + 1}`;
        const newPanes = [...panes];
        newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        dispatch({ type: "CHANGE", List: newPanes })
        setActiveKey(activeKey)
    }
    const  remove = (targetKey:string) => {
        let active = activeKey
        let lastIndex=0
        state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && active === targetKey) {
            if (lastIndex >= 0) {
                active = panes[lastIndex].key;
            } else {
                active = panes[0].key;
            }
        }
        dispatch({type:"CHANGE",List:panes})
        setActiveKey(active)
    };
    return (
        <div>
            <Card title="Tab页签">
                <Tabs defaultActiveKey="1" onChange={e => { }}>
                    <TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </Card>
            <Card title="Tab页签自定义图标">
                <Tabs defaultActiveKey="1" onChange={e => { }}>
                    <TabPane tab={<span>
                        <AppleOutlined />
                        Tab 1
                    </span>} key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab={
                        <span>
                            <AndroidOutlined />
                            Tab 2
                        </span>
                    } key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            </Card>
            <Card title="可编辑Tab">
                <Tabs
                    type="editable-card"
                    onChange={onChange}
                    activeKey={activeKey}
                    onEdit={onEdit}
                >
                    {state.panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                            {pane.content}
                        </TabPane>
                    ))}
                </Tabs>
            </Card>
        </div>
    )
})

export default Tabui