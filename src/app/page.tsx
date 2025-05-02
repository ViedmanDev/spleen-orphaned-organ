import OrgansSection from '@components/layout/OrgansSection/OrgansSection';
import styles from './page.module.css';

export default function Home() {
    return (
        <>
            <section className={styles.info_box}>
                <div className={styles.card_grid}>
                    <article className={styles.card}>
                        <h3>¿QUÉ ES EL BAZO Y PARA QUÉ SIRVE?</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        <span className={styles.arrow_icon}>→</span>
                    </article>
                    <article className={styles.mid_card}>
                        <h3>¿CÓMO TENER CUIDADO CON TÚ BAZO?</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        <span className={styles.arrow_icon}>→</span>
                    </article>
                    <article className={styles.card}>
                        <h3>LA IMPORTANCIA DEL BAZO EN TU CUERPO</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        <span className={styles.arrow_icon}>→</span>
                    </article>
                </div>
            </section>
            {/* <section className={styles.about_section}>
                <div className={styles.about_section_left}></div>
                <div className={styles.about_section_right}>
                    <h2 className={styles.about_section_subtitle}>¿QUIÉNES SOMOS?</h2>
                    <h1 className={styles.about_section_title}>EXPLORA EL MICROSCÓPICO MUNDO DE TÚ BAZO</h1>
                    <p className={styles.about_section_text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio laudantium, esse est dicta quisquam cum officiis voluptatem nobis eum voluptates porro cupiditate reiciendis neque laboriosam at veniam nulla modi. Doloremque.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi numquam fugiat rerum. Repudiandae in assumenda aperiam nisi ratione nostrum consequatur, esse quas nobis ad! Nisi corporis laborum quidem? Blanditiis, itaque.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime temporibus iure cupiditate minus id commodi voluptatem ex! Ad quis tenetur, assumenda repellendus, necessitatibus consequuntur eligendi odio, veritatis et cum libero?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio laudantium, esse est dicta quisquam cum officiis voluptatem nobis eum voluptates porro cupiditate reiciendis neque laboriosam at veniam nulla modi. Doloremque.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi numquam fugiat rerum. Repudiandae in assumenda aperiam nisi ratione nostrum consequatur, esse quas nobis ad! Nisi corporis laborum quidem? Blanditiis, itaque.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime temporibus iure cupiditate minus id commodi voluptatem ex! Ad quis tenetur, assumenda repellendus, necessitatibus consequuntur eligendi odio, veritatis et cum libero?
                    </p>
                </div>
            </section> */}
            <section>
                <OrgansSection />
            </section>
        </>
    );
};