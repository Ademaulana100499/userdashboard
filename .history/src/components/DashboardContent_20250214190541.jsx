import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";

const DashboardContent = () => {
  const [sortConfig, setSortConfig] = useState({
    key: "username",
    direction: "asc",
  });

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://randomuser.me/api");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getArrowIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <FiChevronUp className="text-xs ml-1" />
      ) : (
        <FiChevronDown className="text-xs ml-1" />
      );
    }
    return <FiChevronUp className="text-xs ml-1 opacity-50" />;
  };

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <table className="min-w-full table-auto border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-100">
            <th
              className="border border-slate-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => requestSort("username")}>
              Username
            </th>
            <th
              className="border border-slate-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => requestSort("name")}>
              <div className="flex justify-between items-center">
                <span>Name</span>
                <div className="flex flex-col items-center">
                  <FiChevronUp className="text-xs" />
                  <FiChevronDown className="text-xs" />
                </div>
              </div>
            </th>
            <th
              className="border border-slate-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => requestSort("email")}>
              <div className="flex justify-between items-center">
                <span>Email</span>
                <div className="flex flex-col items-center">
                  <FiChevronUp className="text-xs" />
                  <FiChevronDown className="text-xs" />
                </div>
              </div>
            </th>
            <th
              className="border border-slate-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => requestSort("gender")}>
              <div className="flex justify-between items-center">
                <span>Gender</span>
                <div className="flex flex-col items-center">
                  <FiChevronUp className="text-xs" />
                  <FiChevronDown className="text-xs" />
                </div>
              </div>
            </th>
            <th
              className="border border-slate-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => requestSort("registeredDate")}>
              <div className="flex justify-between items-center">
                <span>Registered Date</span>
                <div className="flex flex-col items-center">
                  <FiChevronUp className="text-xs" />
                  <FiChevronDown className="text-xs" />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((user, index) => (
            <tr key={index} className="hover:bg-slate-50">
              <td className="border border-slate-300 px-4 py-2">
                {user.username}
              </td>
              <td className="border border-slate-300 px-4 py-2">{user.name}</td>
              <td className="border border-slate-300 px-4 py-2">
                {user.email}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {user.gender}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {user.registeredDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardContent;
