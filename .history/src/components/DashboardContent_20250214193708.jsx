import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";

const DashboardContent = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://randomuser.me/api/?page=1&pageSize=10&results=10&gender=female"
      );
      const data = await response.json();
      setData(data.results);
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

    const sortedData = [...data].sort((a, b) => {
      let valA = a[key],
        valB = b[key];
      if (key === "name") {
        valA = `${a.name.first} ${a.name.last}`;
        valB = `${b.name.first} ${b.name.last}`;
      } else if (key === "registered") {
        valA = new Date(a.registered.date);
        valB = new Date(b.registered.date);
      }

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <table className="min-w-full table-auto border-collapse border border-slate-300">
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
                    onClick={() => handleSort("name")}
                    className="text-xs cursor-pointer"
                  />
                  <FiChevronDown
                    onClick={() => handleSort("name")}
                    className="text-xs cursor-pointer"
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
                    className="text-xs cursor-pointer"
                  />
                  <FiChevronDown
                    onClick={() => handleSort("email")}
                    className="text-xs cursor-pointer"
                  />
                </div>
              </div>
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              Gender
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left">
              <div className="flex justify-between items-center">
                <span>Registered Date</span>
                <div className="flex flex-col items-center">
                  <FiChevronUp
                    onClick={() => handleSort("registered")}
                    className="text-xs cursor-pointer"
                  />
                  <FiChevronDown
                    onClick={() => handleSort("registered")}
                    className="text-xs cursor-pointer"
                  />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
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
