import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import YoutubeEmbed from "./YoutubeEmbed";
const API = process.env.REACT_APP_API_KEY;

export default function Movies(props) {
  const { movie } = props;
  const apiImageAddress = "http://image.tmdb.org/t/p/";
  const [movieClip, setMovieClip] = useState([]);
  const [open, setOpen] = useState(false);

  const onClick = (id) => {
    setOpen(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovieClip(data.results.slice(0, 1)));
  };

  const clipAddress = movieClip
    .slice(0, 1)
    .map((clip) => clip.key)
    .join("");

  return (
    <>
      {open && movieClip && (
        <div className="youTubeOverlay" onClick={() => setOpen(!open)}>
          <div className="youTubePanel">
            <YoutubeEmbed embedId={clipAddress} />
          </div>
        </div>
      )}
      <div>
        {(movie.original_language === "en" ||
          movie.original_language === "ko") &&
          movie.poster_path && (
            <>
              <div className="moviesBox">
                <div className="card">
                  <br />
                  <div className="appearHover">
                    <div className="imageDesc" style={{ paddingTop: "20%" }}>
                      <h3>Release Date: </h3>
                      <h4>{movie.release_date}</h4>
                      <div className="spacePtag"></div>
                      <h3>Overview:</h3>
                      <h4>{movie.overview.slice(0, 100) + "..."}</h4>
                      <Link to={`/movie/${movie.id}`}>Detail</Link>
                      <br />
                      <br />
                      <div
                        className="watchBtn"
                        onClick={() => onClick(movie.id)}
                      >
                        Watch Clip
                      </div>
                    </div>
                    <img
                      src={`${apiImageAddress}w300${movie.poster_path}`}
                      alt={movie.name}
                    />
                  </div>
                  <h4 style={{ marginTop: "1rem" }}>{movie.original_title}</h4>
                </div>
              </div>
            </>
          )}
      </div>
    </>
  );
}
