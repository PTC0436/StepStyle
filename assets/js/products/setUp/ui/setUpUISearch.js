import getHashPath from "../../utils/getHashPath.js";

const setUpUISearch = () => {
  const { query } = getHashPath();

  const search = document.getElementById("search");

  if (search) search.value = query.get("search") || "";
};

export default setUpUISearch;
