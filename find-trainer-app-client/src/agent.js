import axios from "axios";

import { API_ROOT, PROFILES_PAGE_SIZE } from "./constants/config";
import { store } from "./store";
import { LOGOUT } from "./constants/action-types";
import { history } from "./components/App";

axios.interceptors.request.use(
    config => {
        // const token = localStorage.getItem(LS_TOKEN_NAME);
        const token = store.getState().auth.token;

        if (token != null) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            //jezeli odmowa dostepu do jakiegos zasobu i nie jest to blad logowania  to wyloguj i przekieruj do logowania
            if (history.location.pathname !== "/login") {
                store.dispatch({ type: LOGOUT });
                history.push({
                    pathname: "/login",
                    state: {
                        from: history.location.pathname,
                        showLoginFirstMessage: true
                    }
                });
            }
        }
        return error;
    }
);

const requests = {
    get: url => axios.get(`${API_ROOT}${url}`),
    post: (url, body) => axios.post(`${API_ROOT}${url}`, body),
    put: (url, body) => axios.put(`${API_ROOT}${url}`, body),
    patch: (url, body) => axios.patch(`${API_ROOT}${url}`, body),
    delete: url => axios.del(`${API_ROOT}${url}`)
};

const Auth = {
    login: credentials => requests.post("/users/login", credentials),
    register: credentials => requests.post("/users/register", credentials)
};

const Search = {
    searchCities: input => {
        return Math.random() < 0.5
            ? axios.get("http://www.mocky.io/v2/5ca1d31c3700002c00899455")
            : axios.get("http://www.mocky.io/v2/5ca21d123300007800d33e8c");
    }
};

const Chat = {
    getConversations: () => requests.get("/chat/conversations"),
    getMessages: (id, alreadyFetched) =>
        requests.get(
            `/chat/conversations/${id}?already_fetched=${alreadyFetched}`
        ),
    getInfo: id => requests.get(`/chat/info/${id}`),
    sendMessage: (receiver, content) =>
        requests.post("/chat/send", { receiver, content })
};

const Profiles = {
    getProfiles: (alreadyFetched = 0, filters = {}) => {
        let filterQuery = Object.keys(filters)
            .map(
                k =>
                    encodeURIComponent(k) + "=" + encodeURIComponent(filters[k])
            )
            .join("&");
        return requests.get(
            `/profiles?already_fetched=${alreadyFetched}&${filterQuery}`
        );
    },

    getProfile: id => requests.get(`/profiles/${id}`)
};

const Account = {
    editProfile: (id, data) => requests.patch(`/profiles/${id}`, data)
};

export { Auth, Search, Profiles, Chat, Account };
