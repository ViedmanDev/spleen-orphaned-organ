"use client";

import styles from "@styles/layout/Header.module.css";
import DropdownMenu from "@components/ui/Dropdown/DropdownMenu";
import { Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { routes, getRouteTitle } from "@config/routes.config";
import { usePathname } from "next/navigation";

const items = [
    {
        key: '1',
        label: (
            <a href={routes.viedman} target="_blank" rel="noopener noreferrer">
                Trauma abdominal
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a href={routes.brandon} target="_blank" rel="noopener noreferrer">
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


const Header = () => {

    const pathname = usePathname();
    const HeaderTitle = getRouteTitle(pathname);

    return (
        <header className={styles.container}>
            <div className={styles.top_section}>
                <p className={styles.title}>SCIENCE <br /> GATEWAY</p>
                <nav className={styles.navigation_menu}>
                    <ul>
                        <li><a href={routes.home}>INICIO</a></li>
                        <li><a href={routes.aboutUs}>SOBRE NOSOTROS</a></li>
                        <li><DropdownMenu icon={<DownOutlined />} items={items} label="ENFERMEDADES" /></li>
                        <li><a href={routes.curiosities}>CURIOSIDADES</a></li>
                        <li><a href={routes.quiz}>QUIZ</a></li>
                        <li><a href="#">MENÚ</a></li>
                    </ul>
                </nav>
            </div>
            <Divider className={styles.divider} />
            <nav className={styles.bottom_section}>
                <div className={styles.bottom_section_container}>
                    <img
                        src="/assets/logo-difuminado.png"
                        alt="logo"
                        width={500}
                        height={500}
                        className={styles.bottom_section_image}
                    />
                    <h1 className={styles.bottom_section_title}>{HeaderTitle}</h1>
                </div>
            </nav>
        </header>
    );
};

export default Header;
