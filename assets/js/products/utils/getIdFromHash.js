function getIdFromHash() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/");

  return parts[parts.length - 1] || null;
}

export default getIdFromHash;
