import "./App.css";
import SearchMovies from "./searchMovies";

export default function App() {
  return (
    <div className="container">
      <h1 className="title">Millions of movies</h1>
      <h2 className="subtitle">Explore now</h2>
      <SearchMovies />
    </div>
  );
}
