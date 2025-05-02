import OrgansSection from '@components/layout/OrgansSection/OrgansSection';
import styles from './page.module.css';
import HomeHeader from '@components/layout/Headers/HomeHeader';

export default function Home() {
    return (
        <>
            <HomeHeader />
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
            <section>
                <OrgansSection />
            </section>
        </>
    );
};