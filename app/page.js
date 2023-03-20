import Hero from './sections/hero'
import MovieTrending from './sections/movietrending'
import MoviePopular from './sections/moviepopular'
import TvPopular from './sections/tvpopular'
import TvTopRated from './sections/tvtoprated'
import MovieNowPlaying from './sections/movienowplaying'
import TvTrending from './sections/tvtrending'
import { Suspense } from 'react'
import Loading from './sections/loading'

export default function Home() {
  return (
    <main className=''> 
        <Suspense fallback={<Loading/>}>
          <Hero/>
          <MovieTrending/>
          <TvTrending/>
          <MovieNowPlaying/>
          <TvPopular/> 
          <MoviePopular/>
          <TvTopRated/>
        </Suspense>
    </main>
  )
}

