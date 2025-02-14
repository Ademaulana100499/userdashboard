const useFilter = (data, setFilteredData, selectedGender, searchKeyword) => {
  const handleSearch = () => {
    const filtered = data.filter((user) =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(searchKeyword.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleGenderFilter = (gender) => {
    if (gender === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((user) => user.gender === gender);
      setFilteredData(filtered);
    }
  };

  const handleResetFilter = () => {
    setFilteredData(data);
  };

  return { handleSearch, handleGenderFilter, handleResetFilter };
};

export default useFilter;
