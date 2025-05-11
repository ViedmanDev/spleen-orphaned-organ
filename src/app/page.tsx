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
                        <p>
                            El bazo es un pequeño órgano que filtra la sangre, eliminando glóbulos rojos viejos y reciclando componentes como el hierro. También produce linfocitos y anticuerpos, ayudando al sistema inmunológico a combatir infecciones.
                        </p>
                        <span className={styles.arrow_icon}>→</span>
                    </article>
                    <article className={styles.mid_card}>
                        <h3>¿CÓMO TENER CUIDADO CON TÚ BAZO?</h3>
                        <p>
                            Para cuidar tu bazo, evita golpes en el abdomen, consulta a un médico si sientes dolor o inflamación, y mantén una vida saludable. Si te extirpan el bazo, sigue las indicaciones médicas para prevenir infecciones.
                        </p>
                        <span className={styles.arrow_icon}>→</span>
                    </article>
                    <article className={styles.card}>
                        <h3>LA IMPORTANCIA DEL BAZO EN TU CUERPO</h3>
                        <p>
                            El bazo filtra la sangre, elimina glóbulos rojos viejos y produce linfocitos para fortalecer el sistema inmunológico. También almacena glóbulos rojos y plaquetas, esenciales para la circulación y coagulación, ayudando a mantener el equilibrio en el cuerpo.
                        </p>
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