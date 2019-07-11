import React, { Component } from "react";
import { Link } from "react-router-dom";
import cover from "../../assets/Album.jpeg";

class Track extends Component {
  state = {
    album_art: cover
  };

  componentDidMount() {
    console.log("Track Mounted!");
    console.log(this.props.track.hasOwnProperty("album_cover_art"));
    if (this.props.track.hasOwnProperty("album_cover_art")) {
      this.props.track.album_cover_art.then(res => {
        this.setState({ album_art: res === "" ? cover : res });
        console.log(res);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.track.hasOwnProperty("album_cover_art")) {
        this.props.track.album_cover_art.then(res => {
          this.setState({ album_art: res === "" ? cover : res });
          console.log(res);
        });
      }
    }
  }

  render() {
    const { track } = this.props;
    return (
      <div className="col-md-2dot4 h-100">
        <div className="card mb-4 shadow-sm">
          <div className="img-container">
            <img
              className="card-img"
              src={this.state.album_art}
              alt="card img"
            />
          </div>
          <div className="card-body d-flex flex-column">
            <h5 className="track-name">{track.track_name}</h5>
            <p className="card-text text-truncate">
              <strong>
                <i className="fas fa-user" /> Artist
              </strong>
              : {track.artist_name}
              <br />
              <strong>
                <i className="fas fa-compact-disc" /> Album
              </strong>
              : {track.album_name}
            </p>
            <Link
              to={`lyrics/track/${track.track_id}`}
              className="btn btn-dark btn-block mt-auto"
            >
              <i className="fas fa-chevron-right" /> View Lyrics
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Track;
