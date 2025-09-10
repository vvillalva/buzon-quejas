import { useState } from "react"
import { Link } from '@inertiajs/react';
import { Search } from "lucide-react";

export default function Header() {
    const [isToggleOpen, setIsToggleOpen] = useState(false)
    const links = [
        { id: 1, name: "Participa", href: "https://chiapas.gob.mx/participa" },
        { id: 2, name: "Trámites", href: "https://chiapas.gob.mx/servicios-por-entidad" },
        { id: 3, name: "Gobierno", href: "https://chiapas.gob.mx/gobierno" },
        { id: 4, name: "Transparencia", href: "http://oficinadelgobernador.transparencia.chiapas.gob.mx/" },
        { id: 5, icon: <Search />, href: "https://chiapas.gob.mx/busquedas" },
    ]
    return (
        <header className=" relative z-20 w-full border-b border-slate-200 bg-[#333333] shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
            <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem] ">
                <nav
                    aria-label="main navigation"
                    className="flex h-[4.5rem] items-stretch justify-between font-medium text-white"
                    role="navigation"
                >
                    {/*      <!-- Brand logo --> */}
                    <Link href="https://chiapas.gob.mx/" className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1">
                        <img src="https://chiapas.gob.mx/assets/logo/escudo-icono.png" alt="" className="w-auto" />
                        chiapas.gob.mx
                    </Link>
                    {/*      <!-- Mobile trigger --> */}
                    <button
                        className={`relative order-10 block h-10 w-10 self-center lg:hidden
                        ${isToggleOpen
                                ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                                : ""
                        }`}
                        onClick={() => setIsToggleOpen(!isToggleOpen)}
                        aria-expanded={isToggleOpen ? "true" : "false"}
                        aria-label="Toggle navigation"
                    >
                        <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                            <span
                                aria-hidden="true"
                                className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-white transition-all duration-300"
                            ></span>
                            <span
                                aria-hidden="true"
                                className="absolute block h-0.5 w-6 transform rounded-full bg-white transition duration-300"
                            ></span>
                            <span
                                aria-hidden="true"
                                className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-white transition-all duration-300"
                            ></span>
                        </div>
                    </button>
                    {/*      <!-- Navigation links --> */}
                    <ul
                        role="menubar"
                        aria-label="Select page"
                        className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-[#333333] px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${isToggleOpen
                            ? "visible opacity-100 backdrop-blur-sm"
                            : "invisible opacity-0"
                            }`}
                    >
                        {links.map((link) => (
                            <li role="none" className="flex items-stretch" key={link.id}>
                                <Link
                                    role="menuitem"
                                    aria-haspopup="false"
                                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:outline-none focus-visible:outline-none lg:px-3"
                                    href={link.href}
                                >
                                    {link.icon ? link.icon : <span>{link.name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

