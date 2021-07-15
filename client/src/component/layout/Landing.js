import React, { useState, useEffect } from "react";
import MovieComponent from "./MovieComponent";
import Paging from "./Paging";
import Search from "./Search";
import { connect } from "react-redux";
import Navigation from "./Navigation";

function Landing() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(1);
  const [totalPage, setTotalPage] = useState([]);
  const API = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    //remove prev movies(used for when search is true or false)
    setMovies([]);
    let movie = ``;
    if (search === "") {
      movie += `https://api.themoviedb.org/3/movie/popular?api_key=${API}&language=en-US&page=${number}`;
    } else {
      movie += `https://api.themoviedb.org/3/search/movie?api_key=${API}&language=en_US&page=${number}&query=${search}`;
    }
    fetchdata(movie);
    window.scrollTo(0, 0);
  }, [number, search]);

  const fetchdata = async (endpOint) => {
    fetch(endpOint)
      .then((res) => res.json())
      .then((results) => {
        setTotalPage(results.total_pages);
        setMovies(results.results);
        setNumber(results.page);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="searchContainer">
        <Search setSearch={setSearch} />
        <Navigation />
      </div>
      <MovieComponent movies={movies} />
      {loading ? (
        <div style={{ textAlign: "center" }}>"..loading"</div>
      ) : (
        <Paging setNumber={setNumber} totalPage={totalPage} />
      )}
    </div>
  );
}

const mapStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateProps)(Landing);
