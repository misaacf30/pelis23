import PosterSlider from "../components/posterslider";

async function getData() {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function MovieTrending() {
  const data = await getData();


  return (
      <section className="flex flex-col mb-4 pl-2 md:pl-6">
        <h2 className="text-gray-200 lg:text-lg pl-0.5">Trending Movies</h2>    
        <PosterSlider
          movies={data.results}
          section="movietrending"
          mediaType="movie"
        />
      </section>
  )
  }