import {
    FacebookFilled,
    InstagramFilled,
    DiscordFilled,
    LinkedinFilled,
    MailFilled,
    EnvironmentFilled
} from '@ant-design/icons';
import styles from '@styles/layout/Footer.module.css';
import DropdownMenu from '@components/ui/Dropdown/DropdownMenu';
import { RightOutlined } from '@ant-design/icons';

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

const Footer = () => {
    return (
        <footer className={styles.container}>
            <nav className={styles.footer_info}>
                <h1 className={styles.footer_info_title} >INFORMACIÓN</h1>
                <p className={styles.footer__nfo_text} >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem quae magnam aliquid corporis, architecto amet modi</p>
                <div className={styles.footer_info_social_media}>
                    <FacebookFilled className={styles.socialMedia_icon} />
                    <DiscordFilled className={styles.socialMedia_icon} />
                    <InstagramFilled className={styles.socialMedia_icon} />
                    <LinkedinFilled className={styles.socialMedia_icon} />
                </div>
            </nav>
            <nav className={styles.footer_nav}>
                <div className={styles.footer_nav_left}></div>
                <div className={styles.footer_nav_right}>
                    <h1 className={styles.footer_nav_title}>NAVEGACIÓN</h1>
                    <DropdownMenu icon={<RightOutlined />} items={[]} label="Homepage" />
                    <DropdownMenu icon={<RightOutlined />} items={[]} label="About us" />
                    <DropdownMenu icon={<RightOutlined />} items={[]} label="Curosities" />
                    <DropdownMenu icon={<RightOutlined />} items={items} label="Diseases" />
                </div>
            </nav>
            <nav className={styles.footer_contact}>
                <h1 className={styles.footer_contact_title}>CONTÁCTANOS</h1>
                <div className={styles.footer_contact_info}>
                    <div className={styles.footer_contact_item}>
                        <EnvironmentFilled className={styles.footer_contact_icon} />
                        <p>Cali - Colombia</p>
                    </div>
                    <div className={styles.footer_contact_item}>
                        <MailFilled className={styles.footer_contact_icon} />
                        <p>SoporteSG@gmail.com</p>
                    </div>
                </div>
                <input type='email' placeholder='Correo electrónico' className={styles.footer_contact_input} />
                <button className={styles.footer_contact_button}>
                    Enviar
                </button>
            </nav>
        </footer>
    )
}

export default Footer;