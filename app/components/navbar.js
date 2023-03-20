import Link from "next/link";

export default function NavBar() {      
    return(
        <nav className="relative sm:bg-zinc-900 w-full z-20 pl-2 py-1 sm:pl-5 sm:py-1">
            <Link 
            href="/"
            className="text-2xl md:text-3xl font-bold">
                <span className="text-white">Pelis</span>
                <span className="text-sky-500">23</span>
            </Link>
        </nav> // SearchBar
    )
}