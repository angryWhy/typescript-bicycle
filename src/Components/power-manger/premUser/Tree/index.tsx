import { Tree } from 'antd';
import * as React from 'react';
import routes from "../../TreeNodeData/menuConfig"
import { User } from '../../index';
import { Key, useState } from 'react';
interface ITreeProps {
    roleList: User[] | User
}

const TreeCpn: React.FunctionComponent<ITreeProps> = ({ roleList }) => {
    const role = roleList as User
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(role.menus!);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);



    const onCheck = (checked: {
        checked: React.Key[];
        halfChecked: Key[];
    } | Key[]) => {
        console.log('onCheck------', checked);
        const c = checked as Key[]
        setCheckedKeys(c);
    };



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
            <Tree
                checkable
                defaultExpandAll
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                selectedKeys={selectedKeys}
                treeData={treeData}
            />
        </div>
    );
};

export default TreeCpn;
