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

  const requestSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <table className="min-w-full table-auto border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-300 px-4 py-2 text-left">
              Username
              <span className="flex items-center justify-center space-x-1">
                <FiChevronUp
                  className={`text-xs ${
                    sortConfig.key === "username" &&
                    sortConfig.direction === "asc"
                      ? "text-blue-500"
                      : "opacity-50 cursor-pointer"
                  }`}
                  onClick={() =>
                    requestSort(
                      "username",
                      sortConfig.direction === "asc" ? "desc" : "asc"
                    )
                  }
                />
                <FiChevronDown
                  className={`text-xs ${
                    sortConfig.key === "username" &&
                    sortConfig.direction === "desc"
                      ? "text-blue-500"
                      : "opacity-50 cursor-pointer"
                  }`}
                  onClick={() =>
                    requestSort(
                      "username",
                      sortConfig.direction === "desc" ? "asc" : "desc"
                    )
                  }
                />
              </span>
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              Name
              <span className="flex items-center justify-center space-x-1">
                <FiChevronUp
                  className={`text-xs ${
                    sortConfig.key === "name" && sortConfig.direction === "asc"
                      ? "text-blue-500"
                      : "opacity-50 cursor-pointer"
                  }`}
                  onClick={() =>
                    requestSort(
                      "name",
                      sortConfig.direction === "asc" ? "desc" : "asc"
                    )
                  }
                />
                <FiChevronDown
                  className={`text-xs ${
                    sortConfig.key === "name" && sortConfig.direction === "desc"
                      ? "text-blue-500"
                      : "opacity-50 cursor-pointer"
                  }`}
                  onClick={() =>
                    requestSort(
                      "name",
                      sortConfig.direction === "desc" ? "asc" : "desc"
                    )
                  }
                />
              </span>
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              Email
              <span className="flex items-center justify-center space-x-1">
                <FiChevronUp
                  className={`text-xs ${
                    sortConfig.key === "email" && sortConfig.direction === "asc"
                      ? "text-blue-500"
                      : "opacity-50 cursor-pointer"
                  }`}
                  onClick={() =>
                    requestSort(
                      "email",
                      sortConfig.direction === "asc" ? "desc" : "asc"
                    )
                  }
                />
                <FiChevronDown
                  className={`text-xs ${
                    sortConfig.key === "email" &&
                    sortConfig.direction === "desc"
                      ? "text-blue-500"
                      : "opacity-50 cursor-pointer"
                  }`}
                  onClick={() =>
                    requestSort(
                      "email",
                      sortConfig.direction === "desc" ? "asc" : "desc"
                    )
                  }
                />
              </span>
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              Gender
              <span className="flex items-center justify-center space-x-1">
                <FiChevronUp
                  className={`text-xs ${
                    sortConfig.key === "gender" &&
                    sortConfig.direction === "asc"
                      ? "text-blue-500"
                      : "opacity-50 cursor-pointer"
                  }`}
                  onClick={() =>
                    requestSort(
                      "gender",
                      sortConfig.direction === "asc" ? "desc" : "asc"
                    )
                  }
                />
                <FiChevronDown
                  className={`text-xs ${
                    sortConfig.key === "gender" &&
                    sortConfig.direction === "desc"
                      ? "text-blue-500"
                      : "opacity-50 cursor-pointer"
                  }`}
                  onClick={() =>
                    requestSort(
                      "gender",
                      sortConfig.direction === "desc" ? "asc" : "desc"
                    )
                  }
                />
              </span>
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              Registered Date
              <span className="flex items-center justify-center space-x-1">
                <FiChevronUp
                  className={`text-xs ${
                    sortConfig.key === "registeredDate" &&
                    sortConfig.direction === "asc"
                      ? "text-blue-500"
                      : "opacity-50 cursor-pointer"
                  }`}
                  onClick={() =>
                    requestSort(
                      "registeredDate",
                      sortConfig.direction === "asc" ? "desc" : "asc"
                    )
                  }
                />
                <FiChevronDown
                  className={`text-xs ${
                    sortConfig.key === "registeredDate" &&
                    sortConfig.direction === "desc"
                      ? "text-blue-500"
                      : "opacity-50 cursor-pointer"
                  }`}
                  onClick={() =>
                    requestSort(
                      "registeredDate",
                      sortConfig.direction === "desc" ? "asc" : "desc"
                    )
                  }
                />
              </span>
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
