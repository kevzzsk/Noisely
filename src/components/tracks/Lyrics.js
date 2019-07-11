import React, { Component } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  getLyrics = () => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        //console.log(res.data);
        this.setState({
          lyrics: res.data.message.body.lyrics
        });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        this.setState({ track: res.data.message.body.track });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getLyrics();
  }

  render() {
    const { track, lyrics } = this.state;

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name}
              <span className="text-secondary"> by </span>{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body lyrics">
                <p className="card-text lyrics">{lyrics.lyrics_body}</p>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Lyrics;
