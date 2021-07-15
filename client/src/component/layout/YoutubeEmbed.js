import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
const YoutubeEmbed = ({ embedId }) => {
  return (
    <div className="video-responsive">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        url={`www.youtube.com/watch?v=${embedId}`}
      />
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
