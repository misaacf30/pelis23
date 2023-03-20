import Image from 'next/image';
import Link from "next/link";
import { AiFillStar } from "react-icons/ai"
import { RiMovie2Line } from "react-icons/ri";
import { BiCameraMovie } from "react-icons/bi";

export async function generateMetadata({ params }) {
  const {id} = params
  const res1 = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`);
  if (!res1.ok) {
    throw new Error('Failed to fetch data');
  } 
  const movie = await res1.json();
  const name = movie.title ? movie.title : (movie.original_title && movie.original_title)
  
  return { title: name };
}

export default async function Page({ params }) {
    const {id} = params   // id due to folder name
    
    const res1 = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`);
    if (!res1.ok) {
      throw new Error('Failed to fetch data');
    } 
    const res2= await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`);
    if (!res2.ok) {
      throw new Error('Failed to fetch data');
    }
    const res3= await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY}`);
    if (!res3.ok) {
      throw new Error('Failed to fetch data');
    } 
    const res4 = await fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.API_KEY}`);
    if (!res4.ok) {
      throw new Error('Failed to fetch data');
    }

    const movie = await res1.json();
    const credits = await res2.json();
    const videos = await res3.json();
    const languages = await res4.json();

    const imgPath = "https://image.tmdb.org/t/p/original"  

    return (
      <div className="relative">    {/* flex flex-col */}
        {/* Backdrop, Poster, Details */}
        <div className={`relative float-left w-full `}>
          {/* Backdrop Image */}
          <Image unoptimized
          src={movie.backdrop_path !== null ? (imgPath + movie.backdrop_path) : (movie.poster_path && (imgPath + movie.poster_path))}
          width={500}
          height={500}
          alt="Backdrop image"
          priority={true}
          className="relative flex w-full h-full max-h-[40rem] xl:max-h-[40rem] 2xl:max-h-[50rem]
          object-cover md:grayscale-0
          saturate-[200%] contrast-[70%] brightness-[50%]
          invert-[10%] sepia-[0%] hue-rotate-[0deg]"/>


          {/* Poster & Details */}
          <div className="md:flex md:flex-row md:absolute md:justify-center z-10
          md:border-box md:max-h-[75%] left-0 bottom-0 md:-translate-y-[25%]
          md:gap-5" // 25^
          >
            {/* Poster Image */}
            {movie.poster_path !== null && (
              <img
              src={movie.poster_path && (imgPath + movie.poster_path)}
              alt="Poster image"
              className=" w-[30%] rounded-lg max-h-[90%] object-cover absolute
              top-0 left-0 translate-x-[120%] translate-y-[10%]
              md:static md:transform-none md:top-0 md:left-0 md:w-[20%]"
              />
            )}

            {/* Movie Details */}
            <div
            className="w-full px-4 flex flex-col md:rounded-md    
            md:w-[55%] md:bottom-0
            "
            >  
              {/* Title */}
              <h1 className="text-sky-500 md:text-sky-500 text-4xl font-bold md:font-extrabold
              flex justify-center text-center md:justify-start md:text-left
              lg:text-6xl"
              >
                {movie.title === null ? (movie.original_title ? movie.original_title : null)  : movie.title}
              </h1>

              {/* Duration, Release, Score */}
              <div className="flex justify-center gap-2 text-gray-400 md:text-gray-300 
              text-sm md:text-base md:justify-start lg:text-lg">          
                  <h2 className="">{movie.runtime && movie.runtime}min</h2>
                  <h2 className="">{movie.release_date && movie.release_date}</h2>   
                  {movie.vote_average !== 0 &&(
                  <h3 className="flex items-center">
                    <AiFillStar className="text-sky-400"/>{movie.vote_average && Math.trunc(movie.vote_average*10)}%
                    </h3>)
                  }
              </div>

              {/* Genres */}
              <h3 className="text-gray-400 md:text-gray-300 text-sm md:text-base flex 
              justify-center gap-1 md:justify-start lg:text-lg xl:text-xl">
                {movie.genres.map((g,index) => (<span key={index}>{g.name}</span>))}
              </h3>

              {/* Tagline, Overview*/}
              <div className="mt-2 lg:text-lg xl:text-xl">
                {movie.tagline && <h2 className="text-gray-500 md:text-gray-300 italic">
                {movie.tagline} </h2>}
                <p className="text-gray-300 md:text-gray-100 text-justify">
                  {movie.overview && movie.overview}
                </p>
              </div>

              {/* Language, Movie */}
              <div className="flex justify-between mt-2 md:flex-col lg:text-lg lg:mt-2 xl:text-xl">
                <p className="text-gray-300 md:text-gray-200 flex items-center gap-1">
                  Language: {languages.map((lg, index) => (lg.iso_639_1 === movie.original_language && 
                  <span key={index}>{lg.english_name}</span>))}
                </p>
                {movie.homepage !== '' ? (
                  <Link href={movie.homepage} className="text-gray-300 md:text-gray-200 
                  cursor-pointer hover:text-gray-500 md:hover:text-gray-500
                  flex items-center gap-1 font-semibold"> 
                    <RiMovie2Line/>Watch Movie
                  </Link>
                ) : null }   
              </div>

              {/* Trailer */}
              {videos.results.length > 0 && (
              <Link 
              href={`https://www.youtube.com/watch?v=${videos.results[videos.results.length-1].key}`}
              className="flex justify-center mt-2 md:justify-start md:mt-0"
              >
                <div
                className="flex cursor-pointer hover:text-sky-700 hover:md:text-sky-600
                items-center gap-1 font-semibold text-sky-500 md:text-sky-400
                lg:text-lg xl:text-xl" 
                >    
                  <BiCameraMovie/>
                  <p>Watch Trailer</p>        
                </div>
              </Link>
              )}        
            </div>
          </div>
        </div>

        {/* Cast */}
        <div className="relative flex flex-col px-3 mt-5">
            <h2 className="text-gray-300 font-semibold lg:text-lg">Cast</h2>
            <div className="flex gap-2 mb-4 overflow-x-scroll scrollbar-thin scrollbar-track-zinc-700  scrollbar-thumb-zinc-500">
              {credits.cast.map((c,index) => (c.profile_path != null && index < 11) && (
                <div className="max-w-[120px] xl:max-w-[170px] h-auto object-cover bg-zinc-800 rounded-lg" id={index} key={index}>
                  <Image unoptimized
                  src={imgPath + c.profile_path}
                  width={600}
                  height={900}
                  alt="Actor image"
                  priority={false}
                  className="max-w-[120px] xl:max-w-[170px] h-auto"
                  />
                  <h3 
                  className="text-gray-500 text-sm lg:text-base text-center mb-2 line-clamp-1">
                    {c.original_name}
                  </h3>
                </div>    
              ))}
          </div>
        </div>
      </div>
    )
}
