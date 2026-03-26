const API_DOMAIN = "https://stepstyle-api.onrender.com";
const TIMEOUT = 1000000;

//////////////////////////////
// TOKEN STORAGE
//////////////////////////////

export const saveAuth = (user) => {
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

const request = async (method, path, data = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

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

export const api = {
  get: (path) => request("GET", path),
  post: (path, data) => request("POST", path, data),
  put: (path, data) => request("PUT", path, data),
  patch: (path, data) => request("PATCH", path, data),
  delete: (path) => request("DELETE", path),
};
