import React from 'react';
import styles from '@styles/routes/curiosities.module.css';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => (
    <article className={styles.card}>
        <div className={styles.imageWrapper}>
            <img src={imageUrl} alt={title} className={styles.image} loading="lazy" />
        </div>
        <div className={styles.content}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
        </div>
    </article>
);

const CuriositiesSection: React.FC = () => (
    <section className={styles.container}>
        <Card
            title="El bazo no es vital para vivir"
            description="Aunque el bazo cumple funciones importantes, no es un órgano esencial. Si una persona lo pierde debido a una lesión o enfermedad, puede seguir viviendo con relativa normalidad. Sin embargo, se vuelve más susceptible a ciertas infecciones, especialmente las bacterianas, por lo que en muchos casos se recomienda vacunación especial después de la esplenectomía."
            imageUrl="/assets/curiositie-1.png"
        />
        <Card
            title="El bazo es parte del sistema inmunológico y del circulatorio"
            description="El bazo tiene una doble función: por un lado, filtra la sangre eliminando glóbulos rojos viejos o dañados; por otro, produce linfocitos (glóbulos blancos) que ayudan a defender al cuerpo de infecciones. También detecta patógenos que circulan por la sangre."
            imageUrl="/assets/curiositie-2.png"
        />
        <Card
            title="El bazo puede almacenar sangre"
            description="El bazo funciona como un reservorio de sangre. En algunas especies animales, como los caballos, esta capacidad es impresionante y se usa durante esfuerzos físicos extremos. En humanos, puede liberar reservas de glóbulos rojos y plaquetas en situaciones críticas como hemorragias."
            imageUrl="/assets/curiositie-3.png"
        />
        <Card
            title="El bazo cambia de tamaño"
            description="El bazo puede aumentar su tamaño (esplenomegalia) cuando hay infecciones, enfermedades autoinmunes, hepáticas o hematológicas. Por ejemplo, en la mononucleosis infecciosa, el bazo se inflama notablemente, tanto que puede llegar a romperse si hay un golpe fuerte."
            imageUrl="/assets/curiositie-4.png"
        />
        <Card
            title="El bazo es el órgano linfoide más grande"
            description="En el sistema linfático, hay varios órganos importantes como los ganglios linfáticos, el timo y las amígdalas. El bazo es el más grande de todos ellos y tiene una estructura especializada para procesar antígenos que circulan por la sangre."
            imageUrl="/assets/curiositie-5.png"
        />
        <Card
            title="El bazo está ubicado bajo la costilla izquierda"
            description="El bazo se encuentra en el cuadrante superior izquierdo del abdomen, justo debajo de la caja torácica. Esta ubicación lo protege, pero también hace que los golpes fuertes en esa zona (como los que ocurren en accidentes o deportes de contacto) puedan dañarlo."
            imageUrl="/assets/curiositie-6.png"
        />
    </section>
);

export default CuriositiesSection;
