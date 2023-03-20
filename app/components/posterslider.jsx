'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

export default function PosterSlider( {movies, section, mediaType} ) {
    const imgPath = "https://image.tmdb.org/t/p/original"

    const toLeft = () => {
        var slider = document.getElementById(section)
        slider.scrollLeft = slider.scrollLeft - 700

        if((slider.scrollLeft-700) <= 0) {
            setActive(false)
        }
      }
    
    const toRight = () => {
        var slider = document.getElementById(section)
        slider.scrollLeft = slider.scrollLeft + 700

        if(!active) {
            setActive(true)
        }
    }

    const [active, setActive] = useState(false)

    return(
        <div className="relative flex items-center overflow-hidden">
            {/* Previous */}
            <MdOutlineKeyboardArrowLeft
            className={`text-sky-500 text-3xl cursor-pointer bg-opacity-80 hover:bg-opacity-100
            left-[0%] px-1 z-10 bg-black h-full flex items-center
            ${active ? 'absolute' : 'hidden'}`}
            onClick={toLeft}
            />

            {/* Posters */}
            <div 
            id={section}
            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide
            overflow-y-hidden flex"
            >
                {movies.map((movie) => (
                    movie.poster_path !== null &&
                    (<Link href={`${mediaType}/${movie.id}`} key={movie.id}>
                        <Image unoptimized
                        src={imgPath + movie.poster_path}
                        width={600}
                        height={900}
                        priority={false}
                        alt="Poster image"                       
                        className="max-w-[120px] xl:max-w-[170px] h-auto p-1
                        cursor-pointer hover:scale-105 ease-in-out duration-300"
                        />
                    </Link>)
                ))}
            </div>
            
            {/* Next */}
            <MdOutlineKeyboardArrowRight
            className="text-sky-500 text-3xl cursor-pointer bg-opacity-80 hover:bg-opacity-100
            absolute right-[0%] px-1 z-10 bg-black h-full items-center hidden sm:flex"
            onClick={toRight}
            />
      </div>
    )
}