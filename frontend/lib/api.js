import axios from "axios";

const api_url = axios.create({
    baseURL: "http://localhost:4567",
    withCredentials: true,
});

async function searchGames(query) {
    try {
        const response = await api_url.get(`/games/search`, { params: { q: query } });
        return response.data;
    } catch (error) {
        console.error("Error fetching games:", error);
        return [];
    }
}

async function getGamePrice(id) {
    try {
        const response = await api_url.get(`/games/${id}/prices`);
        return response.data;
    } catch (error) {
        console.error("Error fetching game price:", error);
        return null;
    }
}

async function getWatchlist() {
    try {
        const response = await api_url.get(`/watchlist`);
        return response.data;
    } catch (error) {
        console.error("Error fetching watchlist:", error);
        return [];
    }
}

async function addToWatchlist(game) {
    try {
        await api_url.post(`/watchlist`, game);
    } catch (error) {
        console.error("Error adding to watchlist:", error);
    }
}

async function removeFromWatchlist(id) {
    try {
        await api_url.delete(`/watchlist/${id}`);
    } catch (error) {
        console.error("Error removing from watchlist:", error);
        throw error;
    }
}

async function login(email, password) {
    try {
        const res = await api_url.post(`/login`, { email, password });
        return res.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

async function logout() {
    try {
        await api_url.post(`/logout`);
    } catch (error) {
        console.error("Error logging out:", error);
    }
}

async function register(username, email, password) {
    try {
        const res = await api_url.post(`/register`, { username, email, password });
        return res.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
}

async function getMe() {
    try {
        const res = await api_url.get(`/me`);
        return res.data;
    } catch (error) {
        return null;
    }
}

async function getPopularGames() {
    try {
        const res = await api_url.get(`/games/popular`);
        return res.data;
    } catch (error) {
        console.error("Error fetching popular games:", error);
        return [];
    }
}

export { searchGames, getGamePrice, getWatchlist, addToWatchlist, removeFromWatchlist, login, logout, register, getMe, getPopularGames };