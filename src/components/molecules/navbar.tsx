import Link from "next/link"
import { useState } from "react"
export const Navbar = () => {
    return (
        <nav className="fixed left-0 top-0 z-50 w-full h-16 flex justify-center items-center bg-white/90 px-2 py-0.5 backdrop-blur-2xl md:px-0">
            <div className="container flex flex-col items-center md:flex-row">
                <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center gap-x-2">
                        <Link href={'/'} className="font-bold md:text-lg lg:text-2xl">
                            Photo<span className="text-orangeprimary">code</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}