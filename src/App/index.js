import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import queryString from "query-string";
import posed, { PoseGroup } from "react-pose";
import Home from "../scenes/Home";
import Artists from "../scenes/Artists";
import Tracks from "../scenes/Tracks";
import NotFound from "../scenes/NotFound";
import MainNav from "../components/MainNav";
import Modal from "../components/Modal";
import * as api from "../utils/api";
import paths from "../utils/extra/paths";
import formatUserName from "../utils/extra/formatUserName";

class App extends Component {
  constructor(props) {
    super(props);
    if (!paths) window.location.href = "/not-found";
  }

  state = {
    accessToken: "",
    user: {},
    artists: [],
    tracks: [],
    showLogin: true,
    showMainNav: false,
    modal: {
      isVisible: false,
      type: "",
      message: "",
      link: "",
      cta: "",
      image: ""
    }
  }

  componentDidMount = async () => {
    const { access_token: accessTokenFromUrl } = queryString.parse(window.location.search);
    const accessTokenFromLocalStorage = localStorage.getItem("syh_access_token");
    const accessToken = accessTokenFromUrl || accessTokenFromLocalStorage;
    if (accessToken) {
      this.setState({ showLogin: false });
      localStorage.setItem("syh_access_token", accessToken);
      const user = await this.getUser(accessToken);
      const artists = await this.getArtists(accessToken);
      const tracks = await this.getTracks(accessToken);
      this.setState({ accessToken: accessToken, user: user, artists: artists, tracks: tracks });
    } else {
      if (window.location.pathname !== "/") window.location.href = "/";
    }
  }

  getUser = async token => {
    const { error, success: userData } = await api.user(token);
    if (error) return this.launchModal("error");
    return {
      name: formatUserName(userData),
      id: userData.id,
      imgUrl: userData.images[0].url,
      uri: userData.uri
    }
  }

  getArtists = async token => {
    const { error, success: artists } = await api.artists(token);
    if (error) return this.launchModal("error");
    return artists;
  }

  getTracks = async token => {
    const { error, success: tracks } = await api.tracks(token);
    if (error) return this.launchModal("error");

    const tracksWithGenre = await tracks.map(async track => {
      const artistId = track.artists[0].id;
      const { error, success: artist } = await api.artist(artistId, token);
      if (error) return this.launchModal("error");
      const genre = artist.genres[0];
      track.genre = genre;
      return track;
    });

    return await Promise.all(tracksWithGenre)
      .then(tracks => { return tracks; });
  }

  createPlaylist = async seed => {
    const accessToken = this.state.accessToken;
    const userID = this.state.user.id;
    const data = (seed === "seed_artists") ? this.state.artists : this.state.tracks;

    // create playlist
    const { error, success: playlist } = await api.createPlaylist(userID, accessToken);
    if (error) return this.launchModal("error");

    // find recommendations
    const { error: error2, success: recommendations } = await api.getRecommendations(accessToken, seed, data);
    if (error2) return this.launchModal("error");

    // get recommendations uris
    let uris = [];
    recommendations.tracks.forEach(item => uris.push(item.uri));

    // add tracks to playlist
    const { error: error3 } = await api.addTracksToPlaylist(userID, playlist.id, uris, accessToken);
    if (error3) return this.launchModal("error");

    // get cover
    const { error: error4, success: imageUrl } = await api.getPlaylistCover(userID, playlist.id, accessToken);
    if (error4) return this.launchModal("error");

    // launch modal
    this.launchModal("success", "Playlist successfully uploaded!", playlist.uri, "Check this out!", imageUrl);
  }

  launchModal = (type, message, link, cta, image) => {

    let modal = {};

    if (type === "error") {
      modal = {
        isVisible: true,
        type: "error",
        message: "We've got a Server problem, please try again! -.-",
        link: "/",
        cta: "Go back home",
        image: null
      };
      localStorage.removeItem("syh_access_token");
    } else {
      modal = {
        isVisible: true,
        type: "success",
        message: message,
        link: link,
        cta: cta,
        image: image
      };
    }

    this.setState({ modal });
  }

  handleMainNav = page => {
    const showMainNav = (page === "/") ? false : true;
    this.setState({ showMainNav });
  }

  display = page => {
    return (this.state[page].length !== 0) ? true : false;
  }

  resetModal() {
    const modal = { isVisible: false, message: "", link: "", image: "" };
    this.setState({ modal });
  }

  render() {
    const { user, artists, tracks, showLogin, showMainNav, modal } = this.state;

    return (
      <React.Fragment>
        {showMainNav && <MainNav />}
        <Modal isVisible={modal.isVisible} data={modal} close={() => this.resetModal()} />
        <Switch>

          {this.display("artists") && <Route
            path={"/artists"}
            render={props => <Artists {...props}
              type="artists"
              data={artists}
              user={user}
              handleMainNav={this.handleMainNav}
              handlePlaylist={this.createPlaylist}
            />}
          />}

          {this.display("tracks") && <Route
            path={"/tracks"}
            render={props => <Tracks {...props}
              type="tracks"
              data={tracks}
              user={user}
              handleMainNav={this.handleMainNav}
              handlePlaylist={this.createPlaylist}
            />}
          />}

          <Route path={"/not-found"} component={NotFound} />

          <Route
            path={"/"}
            exact
            render={props => <Home {...props}
              showLogin={showLogin}
              handleMainNav={this.handleMainNav}
            />}
          />

        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
