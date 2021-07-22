import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { favoriteMovie } from "../../actions/auth";

const API = process.env.REACT_APP_API_KEY;

function DetailPage(props) {
  const Wrap = styled.div`
    padding-top: 4% 0;
    background: black;
    position: relative;
    color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    @media (max-width: 870px) {
      height: 151vh;
    }
  `;

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const apiImageAddress = "http://image.tmdb.org/t/p/";
  const movieId = props.match.params.id;
  useEffect(() => {
    window.scroll(0, 0);
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API}&language=en-US`
    )
      .then((response) => response.json())
      .then((results) => {
        setMovie(results);
        setLoading(false);
      });
  }, [movieId]);
  const { original_title, poster_path } = movie;
  const handleOnclick = () => {
    if (props.isAuthenticated && props.user) {
      const existMovie = props.user.favorites.find((favorite) =>
        favorite.original_title.includes(original_title)
      );
      if (existMovie) {
        return alert("Already Saved");
      } else {
        props.favoriteMovie(original_title, poster_path, movieId);
        return alert("Saved! Check Profile");
      }
    } else {
      return alert("Please Login");
    }
  };

  return (
    <Wrap>
      <section className="midContainer">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="detailLeft">
              <img
                src={
                  movie.poster_path &&
                  `${apiImageAddress}w300${movie.poster_path}`
                }
                alt="movie_picture"
              />
              <p className="voteAverage">{movie.vote_average}</p>
            </div>

            <div className="detailRight">
              <h1>
                {movie.original_title} ({movie.status})
              </h1>
              <button
                className="btn btn-danger"
                style={{ width: "100px" }}
                onClick={handleOnclick}
              >
                save
              </button>
              <p>Release_Date:{movie.release_date}</p>
              <p>
                Genres:{` `}
                {movie.genres &&
                  movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>
                Overview: <br />
                {movie.overview}
              </p>
            </div>
          </>
        )}
      </section>
    </Wrap>
  );
}

const mapStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateProps, { favoriteMovie })(DetailPage);
