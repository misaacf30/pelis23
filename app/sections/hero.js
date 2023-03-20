import Image from 'next/image';
import Link from "next/link"

async function getData() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function Hero() {
    const movies = await getData()
    const imgPath = "https://image.tmdb.org/t/p/original"
    const index = 0

    return (
        <section className="hidden relative sm:flex sm:block w-full"> {/* flex and block needed for safari brower */}     
            {/* Backdrop Image */}
            <div className=" float-left w-full">       
                <div className="absolute w-full h-[100%] bg-gradient-to-r from-black"/>        
                <Image unoptimized
                src={imgPath + movies.results[index].backdrop_path}
                width={500}
                height={640}
                priority={true}
                alt="Backdrop image"
                className="block w-full
                md:max-h-[40rem] xl:max-h-[40rem] 2xl:max-h-[50rem]
                object-cover"
                />
            </div>

            {/* Title, Overview, Link*/}
            <div className="absolute w-[40%] bottom-[25%] left-[10%] py-2 px-2">    
                <div className="mb-2 max-h-[80%]">
                    <h1 className="text-gray-200 font-bold text-4xl md:text-5xl lg:text-6xl xl:text-8xl">
                        {movies.results[index].title}</h1>
                    <p className="text-gray-300 text-xs md:text-base lg:text-lg xl:text-xl line-clamp-3">
                        {movies.results[index].overview}</p>
                </div>
                <Link href={`movie/${movies.results[index].id}`}>
                    <h2 
                    className="text-sky-200 text-xs md:text-base lg:text-lg xl:text-xl hover:text-sky-400 pl-0.5">
                        See more
                    </h2>
                </Link>       
            </div>
        </section>
    )
}