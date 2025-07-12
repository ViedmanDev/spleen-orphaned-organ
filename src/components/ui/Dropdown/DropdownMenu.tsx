import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import styles from "@styles/ui/DropdownMenu.module.css";

interface DropdownMenuProps {
    items: MenuProps['items'];
    icon?: React.ReactNode;
    label?: string;
    color?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    items,
    icon,
    label = "Menu",
    color = "#f5f5f5"
}) => {
    return (
        <Dropdown 
            menu={{ items }} 
            overlayClassName={styles.dropdownOverlay}
        >
            <a className={styles.dropdownTrigger} style={{ color }}>
                <Space>
                    {label}
                    {icon}
                </Space>
            </a>
        </Dropdown>
    );
}

export default DropdownMenu;