import React, { useState, useEffect } from "react";
import MovieComponent from "../MovieComponent";
import Navigation from "../Navigation";
import Search from "../Search";

export default function Genre({ genreId }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [number, setNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const API = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    setMovies([]);
    let endPoint = "";
    if (search === "") {
      endPoint += `https://api.themoviedb.org/3/discover/movie?api_key=${API}&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=${number}&with_genres=${genreId}&with_watch_monetization_types=flatrate`;
    } else {
      endPoint += `https://api.themoviedb.org/3/search/movie?api_key=${API}&language=en-US&page=${number}&query=${search}`;
    }
    fetchdata(endPoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API, search]);

  const fetchdata = async (endpOint) => {
    fetch(endpOint)
      .then((res) => res.json())
      .then((results) => {
        setMovies((prevMovies) => [...prevMovies, ...results.results]);
        setNumber(results.page);
        setLoading(false);
      });
  };

  const onClick = () => {
    setLoading(true);
    let nextURL = "";
    if (search === "") {
      nextURL += `https://api.themoviedb.org/3/discover/movie?api_key=${API}&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=${
        number + 1
      }&with_genres=${genreId}&with_watch_monetization_types=flatrate`;
    } else {
      nextURL += `https://api.themoviedb.org/3/search/movie?api_key=${API}&genre_ids=${genreId}&language=en-US&page=${
        number + 1
      }&query=${search}`;
    }
    fetchdata(nextURL);
  };

  return (
    <div>
      <div className="searchContainer">
        <Search setSearch={setSearch} />
        <Navigation />
      </div>
      <MovieComponent movies={movies} />
      {loading ? (
        <div style={{ textAlign: "center" }}>...loading</div>
      ) : (
        <div className="loadButton" style={{ marginTop: "20px" }}>
          <button onClick={onClick}>Load More</button>
        </div>
      )}
    </div>
  );
}
