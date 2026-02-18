export default function getHashPath() {
  const hash = window.location.hash || "#/";
  const raw = hash.slice(1); // "/?brand=nike"

  const [ path, queryString ] = raw.split("?");

  return {
    path: path === "" ? "/" : path,
    query: new URLSearchParams(queryString || "")
  };
}