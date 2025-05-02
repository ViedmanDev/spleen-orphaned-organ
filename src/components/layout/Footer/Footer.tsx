import styles from '@styles/layout/Footer.module.css';
import DropdownMenu from '@components/ui/Dropdown/DropdownMenu';
import { RightOutlined } from '@ant-design/icons';
import {
    MailFilled,
    EnvironmentFilled
} from '@ant-design/icons';
import { footerNavLinks, socialIcons } from '@config/footer.config';

const Footer = () => {
    return (
        <>
            <div className={styles.information_container}>
                <div className={styles.information_block}>
                </div>
                <div className={styles.information_banner}>
                    <h1 className={styles.information_title}>EXPLORA EL MICROSCÓPICO<br />UNIVERSO DE TU BAZO</h1>
                    <button className={styles.information_button} type="button">CONTÁCTANOS</button>
                </div>
            </div>
            <footer className={styles.footer_container}>
                <nav className={styles.footer_info}>
                    <h1 className={styles.footer_info_title} >INFORMACIÓN</h1>
                    <p className={styles.footer__nfo_text} >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem quae magnam aliquid corporis, architecto amet modi</p>
                    <div className={styles.footer_info_social_media}>
                        {socialIcons.map(({ Icon, ariaLabel }) => (
                            <Icon
                                key={ariaLabel}
                                aria-label={ariaLabel}
                                className={styles.footer_info_social_media_icon}>
                            </Icon>
                        ))}
                    </div>
                </nav>
                <nav className={styles.footer_nav}>
                    <div className={styles.footer_nav_left}></div>
                    <div className={styles.footer_nav_right}>
                        <h1 className={styles.footer_nav_title}>NAVEGACIÓN</h1>
                        {footerNavLinks.map(({ label, items }) => (
                            <DropdownMenu
                                key={label}
                                icon={<RightOutlined />}
                                items={items.map((text, index) => ({
                                    key: String(index),
                                    label: (
                                        <a href="" target='_blank' rel='noopener noreferrer'>
                                            {text}
                                        </a>
                                    ),
                                }))}
                                label={label}
                            />
                        ))}
                    </div>
                </nav>
                <section className={styles.footer_contact}>
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
                </section>
            </footer>
        </>
    )
}

export default Footer;