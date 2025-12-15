// import axios from "axios";

// const API_URL =
//   process.env.REACT_APP_API_URL || "http://localhost:5000";

// const api = axios.create({
//   baseURL: API_URL,
// });

// export const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//   }
// };

// export default api;

import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://inventory-app-zfjs.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
