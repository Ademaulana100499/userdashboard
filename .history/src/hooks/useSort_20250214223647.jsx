const useSort = (filteredData, sortConfig, setFilteredData) => {
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    setFilteredData((prevData) =>
      [...prevData].sort((a, b) => {
        const valueA = getNestedValue(a, key);
        const valueB = getNestedValue(b, key);

        if (valueA < valueB) return direction === "asc" ? -1 : 1;
        if (valueA > valueB) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  const getNestedValue = (obj, path) => {
    return path
      .split(".")
      .reduce((acc, key) => (acc && acc[key] ? acc[key] : ""), obj);
  };

  return { handleSort };
};

export default useSort;
