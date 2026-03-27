import updateQuery from "../utils/updateQuery.js";

//Hàm này để update các trường để sort trong query
const changeSort = (sortField, sortOrder = "asc") => {
  updateQuery({ sort: sortField, order: sortOrder });
};

export default changeSort;
