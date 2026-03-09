const API_DOMAIN = "https://stepstyle-api.onrender.com";
const TIMEOUT = 100000;

//////////////////////////////
// TOKEN STORAGE
//////////////////////////////

const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

export const saveAuth = ({ accessToken, refreshToken, user }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  window.location.href = "/index.html";
};

//////////////////////////////
// FETCH TIMEOUT
//////////////////////////////

const fetchWithTimeout = (url, options, timeout = TIMEOUT) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout),
    ),
  ]);
};

//////////////////////////////
// CORE REQUEST
//////////////////////////////

const request = async (method, path, data = null, auth = false) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (auth) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetchWithTimeout(`${API_DOMAIN}${path}`, options);

    if (res.status === 401) {
      // logout();
      throw new Error("Unauthorized");
    }

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "API error");
    }

    return result;
  } catch (err) {
    console.error("API ERROR:", err);
    throw err;
  }
};

//////////////////////////////
// PUBLIC API
//////////////////////////////

export const api = {
  get: (path) => request("GET", path),
  post: (path, data) => request("POST", path, data),
  put: (path, data) => request("PUT", path, data),
  patch: (path, data) => request("PATCH", path, data),
  delete: (path) => request("DELETE", path),
};

//////////////////////////////
// AUTH API
//////////////////////////////

export const apiAuth = {
  get: (path) => request("GET", path, null, true),
  post: (path, data) => request("POST", path, data, true),
  put: (path, data) => request("PUT", path, data, true),
  patch: (path, data) => request("PATCH", path, data, true),
  delete: (path) => request("DELETE", path, null, true),
};
