import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMovie } from "../../actions/auth";
const apiImageAddress = "http://image.tmdb.org/t/p/";
function MyMovies({ user, isAuthenticated, deleteMovie }) {
  return (
    <div className="myMovieContainer">
      {user && isAuthenticated && (
        <>
          {user.favorites.length === 0 ? (
            <div className="myMovieGreet">
              I am wondering what is your first favorite movie!
            </div>
          ) : (
            user.favorites.map((movie) => (
              <div key={movie.original_title} className="movieCard">
                <div
                  onClick={() => deleteMovie(movie._id)}
                  className="deleteMovie"
                >
                  X
                </div>
                <Link to={`/movie/${movie.movieId}`}>
                  <img
                    src={`${apiImageAddress}/w154/${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                </Link>
                <br />
                <div key={movie._id}>
                  {movie.original_title.length > 14
                    ? movie.original_title.slice(0, 13) + "..."
                    : movie.original_title}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

const mapStateProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateProps, { deleteMovie })(MyMovies);
