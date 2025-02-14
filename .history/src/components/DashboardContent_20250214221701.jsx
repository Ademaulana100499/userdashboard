import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const DashboardContent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For filtered data
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedGender, setSelectedGender] = useState("all"); // Gender filter state
  const [searchKeyword, setSearchKeyword] = useState(""); // For search keyword
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 5; // Number of items to display per page

  const fetchData = async () => {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=10`);
      const result = await response.json();
      setData(result.results);
      setFilteredData(result.results); // Initialize filteredData with all data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleSearch = () => {
    // Filter data based on searchKeyword only when the search button is clicked
    const filtered = data.filter((user) =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(searchKeyword.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleGenderFilter = (gender) => {
    setSelectedGender(gender);
    if (gender === "all") {
      setFilteredData(data); // Show all data if "All" is selected
    } else {
      const filtered = data.filter((user) => user.gender === gender);
      setFilteredData(filtered); // Filter based on selected gender
    }
  };

  const handleResetFilter = () => {
    // Reset filters
    setSelectedGender("all");
    setSearchKeyword("");
    setFilteredData(data); // Reset filtered data to the original
  };

  const getNestedValue = (obj, path) => {
    return path
      .split(".")
      .reduce((acc, key) => (acc && acc[key] ? acc[key] : ""), obj);
  };

  const getSortIconStyle = (key) => {
    return sortConfig.key === key ? "text-black" : "text-gray-400";
  };

  // Paginate the filtered data based on the current page
  const paginateData = (data) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="flex gap-4 items-center mb-4">
        {/* Search */}
        <div className="flex flex-col  gap-2">
          <label htmlFor="search" className="text-sm">
            Search
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)} // Update search keyword
              placeholder="Search..."
              className=" w-32 border border-gray-300 h-8"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="bg-blue-500 border border-gray-300 text-white px-4 h-8  hover:bg-blue-600">
              <FiSearch />
            </button>
          </div>
        </div>

        {/* Gender Filter */}
        <div className="flex flex-col gap-2">
          <label htmlFor="gender" className="text-sm">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={selectedGender}
            onChange={(e) => handleGenderFilter(e.target.value)} // Update gender filter
            className="w-32 border border-gray-300 px-3 h-8 text-left">
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Reset Filter Button */}
        <div className="flex flex-col justify-between gap-5">
          <div></div>
          {/* Reset Filter Button */}
          <button
            type="button"
            onClick={handleResetFilter}
            className="border border-gray-300  px-4 h-8 hover:bg-gray-400 mt-2">
            Reset Filter
          </button>
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse border border-slate-300 mt-4">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-300 px-4 py-2 text-left">
              Username
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              <div className="flex justify-between items-center">
                <span>Name</span>
                <div className="flex flex-col items-center">
                  <FiChevronUp
                    onClick={() => handleSort("name.first")}
                    className={`text-xs cursor-pointer ${getSortIconStyle(
                      "name.first"
                    )}`}
                  />
                  <FiChevronDown
                    onClick={() => handleSort("name.first")}
                    className={`text-xs cursor-pointer ${getSortIconStyle(
                      "name.first"
                    )}`}
                  />
                </div>
              </div>
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              <div className="flex justify-between items-center">
                <span>Email</span>
                <div className="flex flex-col items-center">
                  <FiChevronUp
                    onClick={() => handleSort("email")}
                    className={`text-xs cursor-pointer ${getSortIconStyle(
                      "email"
                    )}`}
                  />
                  <FiChevronDown
                    onClick={() => handleSort("email")}
                    className={`text-xs cursor-pointer ${getSortIconStyle(
                      "email"
                    )}`}
                  />
                </div>
              </div>
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              <div className="flex justify-between items-center">
                <span>Gender</span>
                <div className="flex flex-col items-center">
                  <FiChevronUp
                    onClick={() => handleSort("gender")}
                    className={`text-xs cursor-pointer ${getSortIconStyle(
                      "gender"
                    )}`}
                  />
                  <FiChevronDown
                    onClick={() => handleSort("gender")}
                    className={`text-xs cursor-pointer ${getSortIconStyle(
                      "gender"
                    )}`}
                  />
                </div>
              </div>
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              <div className="flex justify-between items-center">
                <span>Registered Date</span>
                <div className="flex flex-col items-center">
                  <FiChevronUp
                    onClick={() => handleSort("registered.date")}
                    className={`text-xs cursor-pointer ${getSortIconStyle(
                      "registered.date"
                    )}`}
                  />
                  <FiChevronDown
                    onClick={() => handleSort("registered.date")}
                    className={`text-xs cursor-pointer ${getSortIconStyle(
                      "registered.date"
                    )}`}
                  />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginateData(filteredData).map((user, index) => (
            <tr key={index} className="hover:bg-slate-50">
              <td className="border border-slate-300 px-4 py-2">
                {user.login.username}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {user.name.title} {user.name.first} {user.name.last}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {user.email}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {user.gender}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {new Date(user.registered.date)
                  .toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", "")
                  .replace("/", "-")
                  .replace("/", "-")
                  .replace(".", ":")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white">
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white">
          Next
        </button>
      </div>
    </div>
  );
};

export default DashboardContent;
