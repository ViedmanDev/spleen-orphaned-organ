import styles from "@styles/layout/Header.module.css";
import DropdownMenu from "@components/ui/Dropdown/DropdownMenu";
import { Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";

const items = [
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


const Header = () => {
    return (
        <header className={styles.container}>
            <div className={styles.top_section}>
                <p className={styles.title}>SCIENCE <br /> GATEWAY</p>
                <nav className={styles.navigation_menu}>
                    <ul>
                        <li><a href="">HOME</a></li>
                        <li><a href="">ABOUT US</a></li>
                        <li><DropdownMenu icon={<DownOutlined /> } items={items}  label="DISEASES"/></li>
                        <li><a href="">CURIOSITIES</a></li>
                        <li><a href="">QUIZ</a></li>
                        <li><a href="">PAGES</a></li>
                    </ul>
                </nav>
            </div>
            <Divider className={styles.divider} />
            <nav className={styles.bottom_section}>
                <div className={styles.left_section}>
                    <h1 className={styles.title_left_section}>WELCOME TO SCIENCE GATEWAY</h1>
                    <h1 className={styles.subtitle_left_section}>EXPLORE THE <br />MICROSCOPIC <br />UNIVERSE OF YOUR <br />SPLEEN</h1>
                    <p className={styles.text_left_section}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt illum soluta odit beatae nesciunt. Quas dolorum eveniet, doloribus totam unde quaerat laudantium, incidunt error cupiditate sapiente expedita? Doloribus, numquam. Ex.</p>
                    <button className={styles.button_left_section}>
                        ABOUT US
                    </button>
                </div>
                <div className={styles.right_section}>
                    <img
                        src="/assets/logo.png"
                        alt="logo"
                        width={500}
                        height={500}
                        className={styles.image_right_section}
                    />
                </div>
            </nav>
        </header>
    );
};

export default Header;
