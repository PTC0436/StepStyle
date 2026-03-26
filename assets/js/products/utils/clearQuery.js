export default function clearQuery() {
  const { path } = getHashPath();
  window.location.hash = `#${path}`;
}
