import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";

const DashboardContent = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://randomuser.me/api/?results=10&sortBy=email&sortOrder=ascend"
        );
        const result = await response.json();
        setData(result.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSort = (key) => {
    let direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    setData((prevData) =>
      [...prevData].sort((a, b) => {
        const valueA = getNestedValue(a, key);
        const valueB = getNestedValue(b, key);

        if (valueA < valueB) return direction === "asc" ? -1 : 1;
        if (valueA > valueB) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  const getNestedValue = (obj, path) =>
    path
      .split(".")
      .reduce((acc, key) => (acc && acc[key] ? acc[key] : ""), obj);

  const getSortIconStyle = (key) =>
    sortConfig.key === key ? "text-black" : "text-gray-400";

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <table className="min-w-full border border-slate-300">
        <thead>
          <tr className="bg-slate-100">
            {[
              { label: "Username", key: "login.username" },
              { label: "Name", key: "name.first" },
              { label: "Email", key: "email" },
              { label: "Gender", key: "gender" },
              { label: "Registered Date", key: "registered.date" },
            ].map(({ label, key }) => (
              <th
                key={key}
                className="border border-slate-300 px-4 py-2 text-left">
                <div className="flex justify-between items-center">
                  <span>{label}</span>
                  <div className="flex flex-col items-center">
                    <FiChevronUp
                      onClick={() => handleSort(key)}
                      className={`text-xs cursor-pointer ${getSortIconStyle(
                        key
                      )}`}
                    />
                    <FiChevronDown
                      onClick={() => handleSort(key)}
                      className={`text-xs cursor-pointer ${getSortIconStyle(
                        key
                      )}`}
                    />
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((user, index) => (
            <tr key={index} className="hover:bg-slate-50">
              <td className="border border-slate-300 px-4 py-2">
                {user.login.username}
              </td>
              <td className="border border-slate-300 px-4 py-2">{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
              <td className="border border-slate-300 px-4 py-2">
                {user.email}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {user.gender}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {new Date(user.registered.date).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50">
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default DashboardContent;
