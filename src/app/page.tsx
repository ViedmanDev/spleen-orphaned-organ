import OrgansSection from '@components/layout/OrgansSection/OrgansSection';
import styles from './page.module.css';
import Header from '@components/layout/Header';
import Image from 'next/image';


export default function Home() {
    return (
        <>
            <Header />
            <nav className="flex items-center justify-between px-10 py-12 bg-[#f9fafb]">
                <div className="flex-1 max-w-2xl">
                    <h1 className="text-4xl font-bold text-[#BF7E78] mb-4">BIENVENIDO A SCIENCE GATEWAY</h1>
                    <h1 className="text-5xl font-bold text-[#BF5050] mb-6 leading-tight">
                        EXPLORA EL <br />
                        MICROSCOPICO <br />
                        UNIVERSO DE TÚ <br />
                        BAZO
                    </h1>
                    <p className="text-lg text-[#BF7E78] mb-8 leading-relaxed">
                        Este es el portal donde la ciencia cobra vida. Te invitamos a descubrir el microscópico universo de tu bazo, un órgano muchas veces ignorado pero fundamental para tu salud. A través de datos curiosos, ilustraciones claras y contenido accesible, aprenderás cómo este pequeño guardián participa en la defensa de tu cuerpo y en el equilibrio de tu sangre. ¡Explora, aprende y sorpréndete!
                    </p>
                    <button className="bg-[#990000] text-[#F5F5F5] px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300">
                        EXPLORA LAS ENFERMEDADES DEL BAZO
                    </button>
                </div>
                <div className="ml-8">
                    <Image
                        src="/assets/bazo.png"
                        alt="logo"
                        width={500}
                        height={500}
                        className="w-96 h-96 object-contain"
                    />
                </div>
            </nav>
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