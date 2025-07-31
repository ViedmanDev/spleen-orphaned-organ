"use client";

import { routes } from "@config/routes.config";
import Image from "next/image";
import Link from "next/link";


const Header = () => {

    return (
        <header className="bg-header py-4 px-10">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Image
                    src="/assets/logo.png"
                    alt="logo"
                    width={80}
                    height={90}
                />

                {/* Menú de navegación */}
                <nav className="flex items-center">
                    <ul className="flex list-none gap-6">
                        <li><Link href={routes.home} className="nav-link">INICIO</Link></li>
                        <li>
                            <Link href={routes.diseases} className="nav-link">
                                ENFERMEDADES
                            </Link>
                        </li>
                        <li><Link href={routes.quiz} className="nav-link">QUIZ</Link></li>
                        <li><Link href={routes.aboutUs} className="nav-link">SOBRE NOSOTROS</Link></li>
                        <li><Link href={routes.curiosities} className="nav-link">CURIOSIDADES</Link></li>
                        <li><Link href={routes.login} className="nav-link">INICIAR SESIÓN</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
