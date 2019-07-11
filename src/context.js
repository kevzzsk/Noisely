import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        track_list: action.payload,
        heading: "Search Results"
      };
    case "REFRESH_PAGE":
      return {
        ...state,
        heading: "Top 10 Tracks",
        track_list: action.payload
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    heading: "Top 10 Tracks",
    dispatch: action => this.setState(state => reducer(state, action))
  };

  getTrackList = () => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=sg&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        res.data.message.body.track_list.map((each_t, i) => {
          const { track } = each_t;
          console.log(
            `Getting ${track.track_name.split("-")[0]} ${
              track.artist_name.split("feat")[0]
            }..`
          );
          track["album_cover_art"] = this.getAlbumCover(
            `${track.track_name.split("-")[0]} ${
              track.artist_name.split("feat")[0]
            }`
          );
          return track;
        });
        this.setState({
          track_list: res.data.message.body.track_list
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

  componentDidUpdate(prevProps, prevState) {
    // check if track_list is updated.
    // if true, get album cover for updated list
    console.log("PROVIDER UPDATE");
    if (prevState.track_list !== this.state.track_list) {
      if (Object.keys(this.state.track_list).length !== 0) {
        const new_list = this.state.track_list;
        new_list.map((each_t, i) => {
          const { track } = each_t;
          console.log(
            `Getting ${track.track_name.split("-")[0]} ${
              track.artist_name.split("feat")[0]
            }..`
          );
          track["album_cover_art"] = this.getAlbumCover(
            `${track.track_name.split("-")[0]} ${
              track.artist_name.split("feat")[0]
            }`
          );
          return track;
        });
        console.log(new_list);
        this.setState({
          track_list: new_list
        });
      }else {
        this.getTrackList();
      }
    }
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
