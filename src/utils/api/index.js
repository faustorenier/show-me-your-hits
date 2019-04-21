import axios from "axios";
import names from "../extra/playlistNames";

const error = new Error("Something went wrong... Please try again!");
const result = { success: null, error: null }

export const user = async accessToken => {
    const url = "https://api.spotify.com/v1/me";
    const headers = { headers: { 'Authorization': 'Bearer ' + accessToken } };
    try {
        const user = await axios.get(url, headers);
        result.success = user.data;
        return result;
    } catch (err) {
        result.error = error.message;
        return result;
    }
}

export const artists = async accessToken => {
    const url = "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=25";
    const headers = { headers: { 'Authorization': 'Bearer ' + accessToken } };
    try {
        const artists = await axios.get(url, headers);
        result.success = artists.data.items;
        return result;
    } catch (err) {
        result.error = error.message;
        return result;
    }
}

export const artist = async (id, accessToken) => {
    const url = `https://api.spotify.com/v1/artists/${id}`;
    const headers = { headers: { 'Authorization': 'Bearer ' + accessToken } };
    try {
        const artist = await axios.get(url, headers);
        result.success = artist.data;
        return result;
    } catch (err) {
        result.error = error.message;
        return result;
    }
}

export const tracks = async accessToken => {
    const url = "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=25";
    const headers = { headers: { 'Authorization': 'Bearer ' + accessToken } };
    try {
        const tracks = await axios.get(url, headers);
        result.success = tracks.data.items;
        return result;
    } catch (err) {
        result.error = error.message;
        return result;
    }
}

export const createPlaylist = async (userId, accessToken) => {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const headers = { headers: { 'Authorization': 'Bearer ' + accessToken } };

    const random = Math.floor(Math.random() * names.length);
    const data = { name: names[random], public: true };

    try {
        const playlist = await axios.post(url, data, headers);
        result.success = playlist.data;
        return result;
    } catch (err) {
        result.error = error.message;
        return result;
    }
}

export const getRecommendations = async (accessToken, seed, data) => {
    let url = `https://api.spotify.com/v1/recommendations?limit=50&${seed}=`;
    const headers = { headers: { 'Authorization': 'Bearer ' + accessToken } };

    // build ids for query (5 random seeds id)
    const random = Math.floor(Math.random() * 20);
    const ids = data.map(el => el.id).slice(random, random + 5);
    for (let i = 0; i <= ids.length - 1; i++) {
        url += (i < ids.length - 1) ? ids[i] + "," : ids[i]
    }

    try {
        const recomm = await axios.get(url, headers);
        result.success = recomm.data;
        return result;
    } catch (err) {
        result.error = error.message;
        return result;
    }
}

export const addTracksToPlaylist = async (userID, playlistID, uris, accessToken) => {
    const url = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
    const body = { uris: uris };
    const headers = { headers: { 'Authorization': 'Bearer ' + accessToken } };

    try {
        const res = await axios.post(url, body, headers);
        result.success = res.data;
        return result;
    } catch (err) {
        result.error = error.message;
        return result;
    }
}

export const getPlaylistCover = async (userID, playlistID, accessToken) => {
    const url = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/images`;
    const headers = { headers: { 'Authorization': 'Bearer ' + accessToken } };

    try {
        const playlistImages = await axios.get(url, headers);
        result.success = playlistImages.data[0].url;
        return result;
    } catch (err) {
        result.error = error.message;
        return result;
    }
}