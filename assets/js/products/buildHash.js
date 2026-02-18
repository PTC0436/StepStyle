export default function buildHash(path = "/", query = {}) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([ key, value ]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.set(key, value);
    }
  });

  const qs = params.toString();
  return qs ? `#${path}?${qs}` : `#${path}`;
}