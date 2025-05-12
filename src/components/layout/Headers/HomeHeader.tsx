import styles from "@styles/layout/HomeHeader.module.css";
import DropdownMenu from "@components/ui/Dropdown/DropdownMenu";
import { Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { routes } from "@config/routes.config";

const items = [
    {
        key: '1',
        label: (
            <a href={routes.viedman} rel="noopener noreferrer">
                Trauma abdominal
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a href={routes.brandon} rel="noopener noreferrer">
                Trombosis esplénica
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a href={routes.gary} rel="noopener noreferrer">
                Infarto esplénico
            </a>
        ),
    },
    {
        key: '4',
        label: (
            <a href={routes.hurtado} rel="noopener noreferrer">
                Quiste esplénico
            </a>
        ),
    }
];


const HomeHeader = () => {
    return (
        <header className={styles.container}>
            <div className={styles.top_section}>
                <p className={styles.title}>SCIENCE <br /> GATEWAY</p>
                <nav className={styles.navigation_menu}>
                    <ul>
                        <li><a href={routes.home}>INICIO</a></li>
                        <li><a href={routes.aboutUs}>SOBRE NOSOTROS</a></li>
                        <li><DropdownMenu icon={<DownOutlined />} items={items} label="ENFERMEDADES" color="#BF5050"/></li>
                        <li><a href={routes.curiosities}>CURIOSIDADES</a></li>
                        <li><a href={routes.quiz}>QUIZ</a></li>
                        <li><a href="#">MENÚ</a></li>
                    </ul>
                </nav>
            </div>
            <Divider className={styles.divider} />
            <nav className={styles.bottom_section}>
                <div className={styles.left_section}>
                    <h1 className={styles.title_left_section}>BIENVENIDO A SCIENCE GATEWAY</h1>
                    <h1 className={styles.subtitle_left_section}>EXPLORA EL <br />MICROSCOPICO <br />UNIVERSO DE TÚ <br />BAZO</h1>
                    <p className={styles.text_left_section}>
                        Este es el portal donde la ciencia cobra vida. Te invitamos a descubrir el microscópico universo de tu bazo, un órgano muchas veces ignorado pero fundamental para tu salud. A través de datos curiosos, ilustraciones claras y contenido accesible, aprenderás cómo este pequeño guardián participa en la defensa de tu cuerpo y en el equilibrio de tu sangre. ¡Explora, aprende y sorpréndete!
                    </p>
                    <button className={styles.button_left_section}>
                        SOBRE NOSOTROS
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

export default HomeHeader;
