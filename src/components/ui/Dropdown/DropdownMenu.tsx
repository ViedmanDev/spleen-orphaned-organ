import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import styles from "@styles/ui/DropdownMenu.module.css";

interface DropdownMenuProps {
    items: MenuProps['items'];
    icon?: React.ReactNode;
    label?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    items,
    icon,
    label = "Menu"
}) => {
    return (
        <Dropdown menu={{ items }} className={styles.dropdownMenu}>
                <Space className={styles.dropdownMenu__space}>
                    {icon}
                    {label}
                </Space>
        </Dropdown>
    )
}

export default DropdownMenu;

