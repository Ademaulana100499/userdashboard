import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

const DashboardContent = () => {
  const [sortConfig, setSortConfig] = useState({
    key: "username",
    direction: "asc",
  });

  const data = [
    {
      username: "john_doe",
      name: "John Doe",
      email: "john.doe@example.com",
      gender: "Male",
      registeredDate: "2023-01-15",
    },
    {
      username: "jane_doe",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      gender: "Female",
      registeredDate: "2023-02-22",
    },
    {
      username: "alex_smith",
      name: "Alex Smith",
      email: "alex.smith@example.com",
      gender: "Male",
      registeredDate: "2023-03-10",
    },
  ];

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
      <table className="min-w-full table-auto flex border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-100">
            <th
              className="border border-slate-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => requestSort("username")}>
              Username
            </th>
            <th
              className="border flex justify-between border-slate-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => requestSort("name")}>
              Name{" "}
              <div>
                <FiChevronUp className="text-xs ml-1" />
                <FiChevronDown className="text-xs ml-1" />
              </div>
            </th>
            <th
              className="border flex justify-between border-slate-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => requestSort("email")}>
              Email
              <div>
                <FiChevronUp className="text-xs ml-1" />
                <FiChevronDown className="text-xs ml-1" />
              </div>
            </th>
            <th
              className="border flex justify-between border-slate-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => requestSort("gender")}>
              Gender{" "}
              <div>
                <FiChevronUp className="text-xs ml-1" />
                <FiChevronDown className="text-xs ml-1" />
              </div>
            </th>
            <th
              className="border flex justify-between border-slate-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => requestSort("registeredDate")}>
              Registered Date{" "}
              <div>
                <FiChevronUp className="text-xs ml-1" />
                <FiChevronDown className="text-xs ml-1" />
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
