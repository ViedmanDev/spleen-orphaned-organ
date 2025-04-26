import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a href="" target="_blank" rel="noopener noreferrer">
                Trauma abdominal
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a href="" target="_blank" rel="noopener noreferrer">
                Trombosis esplénica
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a href="" target="_blank" rel="noopener noreferrer">
                Infarto esplénico
            </a>
        ),
    },
    {
        key: '4',
        label: (
            <a href="" target="_blank" rel="noopener noreferrer">
                Infarto intestinal
            </a>
        ),
    }
];

const DropdownMenu = () => {
    return (
        <>
            <Dropdown
                menu={{ items }}
            >
                <Space>
                    DISEASES
                    <DownOutlined />
                </Space>
            </Dropdown>
        </>
    )
}

export default DropdownMenu;

