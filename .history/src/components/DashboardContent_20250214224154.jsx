import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import useSort from "@/hooks/useSort";
import useFilter from "@/hooks/useFilter";
import usePagination from "@/hooks/usePagination";

const DashboardContent = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedGender, setSelectedGender] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data, filteredData, setFilteredData } = useFetchData();
  const { handleSort } = useSort(filteredData, sortConfig, setFilteredData);
  const { handleSearch, handleGenderFilter, handleResetFilter } = useFilter(
    data,
    setFilteredData,
    selectedGender,
    searchKeyword
  );
  const { paginateData, totalPages, handlePageChange } = usePagination(
    filteredData,
    currentPage,
    setCurrentPage,
    itemsPerPage
  );

  const getSortIconStyle = (key) => {
    return sortConfig.key === key ? "text-black" : "text-gray-400";
  };

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="flex gap-4 items-center mb-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="search" className="text-sm">
            Search
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search..."
              className="w-52 border border-gray-300 h-8"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="bg-blue-500 border border-gray-300 text-white px-4 h-8 hover:bg-blue-600">
              <FiSearch />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gender" className="text-sm">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={selectedGender}
            onChange={(e) => handleGenderFilter(e.target.value)}
            className="w-52 border border-gray-300 px-3 h-8 text-left">
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex flex-col justify-between mt-5 gap-5">
          <button
            type="button"
            onClick={handleResetFilter}
            className="border border-gray-300 px-4 h-8 hover:bg-gray-400 mt-2">
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
              Email
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              Gender
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              Registered Date
            </th>
          </tr>
        </thead>
        <tbody>
          {paginateData().map((user, index) => (
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
      <div className="flex justify-end items-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 disabled:text-gray-300">
          &lt;
        </button>
        <button
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 border border-gray-300 ${
            currentPage === 1 ? "text-blue-500 border-blue-500" : ""
          }`}>
          1
        </button>
        <button
          onClick={() => handlePageChange(2)}
          className={`px-3 py-1 border border-gray-300 ${
            currentPage === 2 ? "text-blue-500 border-blue-500" : ""
          }`}>
          2
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 disabled:text-gray-300">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default DashboardContent;
