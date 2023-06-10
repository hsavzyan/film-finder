import { useState } from "react";

export default function SearchMovies() {
  // State for input query
  const [query, setQuery] = useState("");

  // State for movies
  const [movies, setMovies] = useState([]);

  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // State for error message
  const [error, setError] = useState(null);

  // Function to fetch movies
  const fetchMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies. Please try again later.");
      setIsLoading(false);
    }
  };

  // Function to handle form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=3382168aa32c3a2b2f75ce9f3c788d57&language=en-US&query=${query}&page=1&include_adult=false`;
    fetchMovies(url);
  };

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <div className="card" key={movie.id}>
              <img
                className="card--image"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} //w185_and_h278_bestv2//w370_and_h556_bestv2//
                alt={movie.title + " poster"}
              />
              <div className="card--content">
                <h3 className="card--title">{movie.title}</h3>
                <p>
                  <small>RELEASE DATE: {movie.release_date}</small>
                </p>
                <p>
                  <small>RATING: {movie.vote_average}</small>
                </p>
                <p className="card--desc">{movie.overview}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
