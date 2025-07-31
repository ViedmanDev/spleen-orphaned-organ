"use client";

import { routes } from "@config/routes.config";
import Image from "next/image";
import Link from "next/link";


const Header = () => {

    return (
        <header className="bg-[#f2d8c2] py-4 px-10">
            <div className="flex justify-between items-center">
                <Image
                    src="/assets/logo.png"
                    alt="logo"
                    width={80}
                    height={90}
                />

                {/* Menú de navegación */}
                <nav className="flex items-center">
                    <ul className="flex list-none gap-6">
                        <li><a href={routes.home} className="text-[#BF5050] no-underline hover:text-[#990000] transition-colors">INICIO</a></li>
                        <li>
                            <Link href="/enfermedades" className="text-[#BF5050] no-underline hover:text-[#990000] transition-colors">
                                ENFERMEDADES
                            </Link>
                        </li>
                        <li><a href={routes.quiz} className="text-[#BF5050] no-underline hover:text-[#990000] transition-colors">QUIZ</a></li>
                        <li><a href={routes.aboutUs} className="text-[#BF5050] no-underline hover:text-[#990000] transition-colors">SOBRE NOSOTROS</a></li>
                        <li><a href={routes.curiosities} className="text-[#BF5050] no-underline hover:text-[#990000] transition-colors">CURIOSIDADES</a></li>
                        <li><a href="#" className="text-[#BF5050] no-underline hover:text-[#990000] transition-colors">INICIAR SESIÓN</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
