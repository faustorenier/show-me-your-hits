import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import queryString from "query-string";
import * as api from "../utils/api";
import * as modal from "../utils/modals";
import formatUserName from "../utils/extra/formatUserName";
import Home from "../scenes/Home";
import Artists from "../scenes/Artists";
import NotFound from '../scenes/NotFound';
import MainNav from '../components/MainNav';
import Modal from '../components/Modal';

class App extends Component {

  state = {
    accessToken: "",
    user: {},
    artists: [],
    tracks: [],
    showLogin: true,
    showMainNav: false,
    modal: {
      isVisible: false,
      message: "",
      link: "",
      image: ""
    }
  }

  componentDidMount = async () => {
    const { access_token: accessTokenFromUrl } = queryString.parse(window.location.search);
    const accessTokenFromLocalStorage = localStorage.getItem("syh_access_token");
    const accessToken = accessTokenFromUrl || accessTokenFromLocalStorage;
    if (accessToken) {
      localStorage.setItem("syh_access_token", accessToken);
      const user = await this.getUser(accessToken);
      const artists = await this.getArtists(accessToken);
      const tracks = await this.getTracks(accessToken);
      this.setState({ accessToken: accessToken, user: user, artists: artists, tracks: tracks, showLogin: false });
    }
  }

  getUser = async token => {
    const { error, success: userData } = await api.user(token);
    if (error) return modal.error(error);
    return {
      name: formatUserName(userData),
      id: userData.id,
      imgUrl: userData.images[0].url,
      uri: userData.uri
    }
  }

  getArtists = async token => {
    const { error, success: artists } = await api.artists(token);
    if (error) return modal.error(error);
    return artists;
  }

  getTracks = async token => {
    const { error, success: tracks } = await api.tracks(token);
    if (error) return modal.error(error);

    const tracksWithGenre = await tracks.map(async track => {
      const artistId = track.artists[0].id;
      const { error, success: artist } = await api.artist(artistId, token);
      if (error) return modal.error(error);
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
    if (error) return modal.error(error);

    // find recommendations
    const { error: error2, success: recommendations } = await api.getRecommendations(accessToken, seed, data);
    if (error2) return modal.error(error);

    // get recommendations uris
    let uris = [];
    recommendations.tracks.forEach(item => uris.push(item.uri));

    // add tracks to playlist
    const { error: error3 } = await api.addTracksToPlaylist(userID, playlist.id, uris, accessToken);
    if (error3) return modal.error(error);

    // get cover
    const { error: error4, success: imageUrl } = await api.getPlaylistCover(userID, playlist.id, accessToken);
    if (error4) return modal.error(error);

    // launch modal
    const modal = {
      isVisible: true,
      message: "Playlist successfully uploaded!",
      link: playlist.uri,
      image: imageUrl
    };
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
    const { accessToken, user, artists, tracks, showLogin, showMainNav, modal } = this.state;

    return (
      <React.Fragment>

        <MainNav isVisible={showMainNav} />
        {modal.isVisible && <Modal data={modal} close={() => this.resetModal()} />}

        <Switch>
          {this.display("artists") && <Route
            path={"/artists"}
            render={props => <Artists {...props}
              artists={artists}
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
          {/* <Redirect to="/not-found" /> */}
        </Switch>

      </React.Fragment>
    );
  }
}

export default App;
