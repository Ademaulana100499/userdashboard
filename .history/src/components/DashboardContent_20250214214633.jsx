import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const DashboardContent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For filtered data
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedGender, setSelectedGender] = useState("all"); // Gender filter state
  const [searchKeyword, setSearchKeyword] = useState(""); // For search keyword

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?page=1&pageSize=10&results=10`
      );
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

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)} // Update search keyword
          placeholder="Search..."
          className="border border-slate-300 rounded-md px-2 py-1"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-blue-500 text-white px-2 py-1 ml-2">
          <FiSearch />
        </button>
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          value={selectedGender}
          onChange={(e) => handleGenderFilter(e.target.value)} // Update gender filter
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <button
        type="button"
        onClick={handleResetFilter}
        className="bg-gray-500 text-white px-4 py-1 mt-2">
        Reset Filter
      </button>
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
          {filteredData.map((user, index) => (
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
    </div>
  );
};

export default DashboardContent;
