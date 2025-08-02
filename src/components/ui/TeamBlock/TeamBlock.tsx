import { FacebookFilled, InstagramFilled, LinkedinFilled } from '@ant-design/icons';
import styles from "@styles/ui/TeamBlock.module.css";
import Image from 'next/image';

interface TeamBlockProps {
    name: string;
    image: string;
}

export default function TeamBlock({ name, image }: TeamBlockProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.image}>
                <Image
                    src={image}
                    alt="Foto del fundador"
                    width={100}
                    height={100}
                />
            </div>
            <div className={styles.info}>
                <p className={styles.info_position}>Fundador</p>
                <h1 className={styles.info_name}>{name}</h1>
                <div className={styles.socials}>
                    <a href="">
                        <FacebookFilled className={styles.socials_icon} />
                    </a>
                    <a href="">
                        <InstagramFilled className={styles.socials_icon} />
                    </a>
                    <a href="">
                        <LinkedinFilled className={styles.socials_icon} />
                    </a>
                </div>
            </div>
        </div>
    );
}