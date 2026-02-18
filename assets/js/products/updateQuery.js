import getHashPath from "./getHashPath.js";
import buildHash from "./buildHash.js"

export default function updateQuery(newQuery = {}) {
  const { path, query } = getHashPath();

  Object.entries(newQuery).forEach(([ key, value ]) => {

    if (value === null || value === undefined || value === "") {
      query.delete(key);
      return;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        query.delete(key);
      } else {
        query.set(key, value.join(","));
      }
      return;
    }

    query.set(key, value);
  });

  const newHash = buildHash(path, Object.fromEntries(query));

  if (newHash == window.location.hash) return;

  window.location.hash = newHash;
}