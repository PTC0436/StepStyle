export default function navigate(path = "/", query = {}) {
  window.location.hash = buildHash(path, query);
}