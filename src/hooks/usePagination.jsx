const usePagination = (
  filteredData,
  currentPage,
  setCurrentPage,
  itemsPerPage
) => {
  const paginateData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return { paginateData, totalPages, handlePageChange };
};

export default usePagination;
