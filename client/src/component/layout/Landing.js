import React, { useState, useEffect } from "react";
import MovieComponent from "./MovieComponent";
import Paging from "./Paging";
import Search from "./Search";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";

function Landing() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { number1 } = location.state || {};
  const [number, setNumber] = useState(number1);
  const [totalPage, setTotalPage] = useState([]);
  const API = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    setNumber("1");
  }, [number1, location]);

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
  }, [API, number, search]);

  const fetchdata = async (endPoint) => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((results) => {
        setTotalPage(results.total_pages);
        setMovies(results.results);
        setNumber(results.page);
        setLoading(false);
      });
    // axios.get(endPoint).then((results) => {
    //   setTotalPage(results.data.total_pages);
    //   setMovies(results.data.results);
    //   setNumber(results.data.page);
    //   // console.log(results.data);
    //   setLoading(false);
    // });
  };

  return (
    <div>
      <div className="searchContainer">
        <Search setSearch={setSearch} movies={movies} />
        <Navigation />
      </div>
      <MovieComponent movies={movies} />
      {loading ? (
        <div style={{ textAlign: "center" }}>"Loading..."</div>
      ) : (
        <Paging number={number} setNumber={setNumber} totalPage={totalPage} />
      )}
    </div>
  );
}

const mapStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateProps)(Landing);
