import updateQuery from "../utils/updateQuery.js";

//Hàm này để update search trong query
const changeSearch = (newSearch) => {
  updateQuery({ search: newSearch });
};

export default changeSearch;
