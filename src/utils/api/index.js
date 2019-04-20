import axios from "axios";
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