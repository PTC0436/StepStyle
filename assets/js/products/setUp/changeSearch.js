import updateQuery from "../utils/updateQuery.js";

const changeSearch = (newSearch) => {
  updateQuery({ search: newSearch });
};

export default changeSearch;
