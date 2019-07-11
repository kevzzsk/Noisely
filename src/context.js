import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    track_list: [],
    heading: "Top 10 Tracks"
  };

  getTrackList = () => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=sg&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        return res.data.message.body.track_list;
      })
      .then(res => {
        res.map((each_t, i) => {
          const { track } = each_t;
          console.log(
            `Getting ${track.track_name.split("-")[0]} ${track.artist_name.split("feat")[0]}..`
          );
          track["album_cover_art"] = this.getAlbumCover(
            `${track.track_name.split("-")[0]} ${track.artist_name.split("feat")[0]}`
          );
          return track;
        });
        this.setState({
          track_list: res
        });
      })
      .catch(err => console.log(err));
  };

  getAlbumCover = async query => {
    let res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.genius.com/search?q=${query}&access_token=${
        process.env.REACT_APP_GENIUS_TOKEN
      }`
    );
    if (Object.keys(res.data.response.hits).length === 0) {
      //console.log(`no album art found! for ${query}`);
      return "";
    } else {
      // return album cover art url
      return res.data.response.hits[0].result.song_art_image_thumbnail_url;
    }
  };

  componentDidMount() {
    this.getTrackList();
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
