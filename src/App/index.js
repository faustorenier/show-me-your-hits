import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import queryString from "query-string";
import * as api from "../utils/api";
import modal from "../utils/modal";
import formatUserName from "../utils/extra/formatUserName";
import Home from "../scenes/Home";
import Artists from "../scenes/Artists";
import NotFound from '../scenes/NotFound';
import MainNav from '../components/MainNav';

class App extends Component {

  state = {
    accessToken: "",
    user: {},
    artists: [],
    tracks: [],
    showLogin: true,
    showMainNav: false
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
    if (error) return modal(error);
    return {
      name: formatUserName(userData),
      id: userData.id,
      imgUrl: userData.images[0].url,
      uri: userData.uri
    }
  }

  getArtists = async token => {
    const { error, success: artists } = await api.artists(token);
    if (error) return modal(error);
    return artists;
  }

  getTracks = async token => {
    const { error, success: tracks } = await api.tracks(token);
    if (error) return modal(error);

    const tracksWithGenre = await tracks.map(async track => {
      const artistId = track.artists[0].id;
      const { error, success: artist } = await api.artist(artistId, token);
      if (error) return modal(error);
      const genre = artist.genres[0];
      track.genre = genre;
      return track;
    });

    return await Promise.all(tracksWithGenre)
      .then(tracks => { return tracks; });
  }

  createPlaylist = () => {
    console.log("create playlist...");
  }

  handleMainNav = page => {
    const showMainNav = (page === "/") ? false : true;
    this.setState({ showMainNav });
  }

  render() {
    const { accessToken, user, artists, tracks, showLogin, showMainNav } = this.state;

    return accessToken ?
      (
        <React.Fragment>
          {showMainNav && <MainNav />}
          <Switch>
            <Route
              path={"/artists"}
              render={props => <Artists {...props}
                artists={artists}
                user={user}
                handleMainNav={this.handleMainNav}
                createPlaylist={this.createPlaylist}
              />}
            />
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
      )
      : (
        <React.Fragment>
          <Switch>
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
      )
  }
}

export default App;
