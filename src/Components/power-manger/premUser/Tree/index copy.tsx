import { Tree } from 'antd';
import * as React from 'react';
import routes from "../../TreeNodeData/menuConfig"
import { User } from '../../index';
interface ITreeProps {
    roleList: User[] | User
}

const TreeCpn: React.FunctionComponent<ITreeProps> = ({ roleList }) => {
    
    const role = roleList as User
    const onCheck = (checked: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[]; }, info: any) => {
        console.log('onCheck', checked, info);
    }
    const onSelect = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info);
    }

    const treeData = routes.map(item => {
        item.key = item.link
        if (item.children) {
            item.children.map(itemC => {
                itemC.key = itemC.link
                return itemC
            })
        }
        return item
    })
    return (
        <div>
            <Tree treeData={treeData} checkable defaultExpandAll checkedKeys={role.menus} onCheck={onCheck} onSelect={onSelect} />
        </div>
    );
};

export default TreeCpn;
