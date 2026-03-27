const changeSort = (sortField, sortOrder = "asc") => {
  updateQuery({ sort: sortField, order: sortOrder });
};

export default changeSort;
