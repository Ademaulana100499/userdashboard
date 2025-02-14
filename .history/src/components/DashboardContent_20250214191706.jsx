import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";

const DashboardContent = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      setData(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <table className="min-w-full table-auto border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-300 px-4 py-2 text-left cursor-pointer">
              Username
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left cursor-pointer">
              <div className="flex justify-between items-center">
                <span>Name</span>
                <div className="flex flex-col items-center">
                  <FiChevronUp className="text-xs" />
                  <FiChevronDown className="text-xs" />
                </div>
              </div>
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left cursor-pointer">
              <div className="flex justify-between items-center">
                <span>Email</span>
                <div className="flex flex-col items-center">
                  <FiChevronUp className="text-xs" />
                  <FiChevronDown className="text-xs" />
                </div>
              </div>
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left cursor-pointer">
              <div className="flex justify-between items-center">
                <span>Gender</span>
                <div className="flex flex-col items-center">
                  <FiChevronUp className="text-xs" />
                  <FiChevronDown className="text-xs" />
                </div>
              </div>
            </th>
            <th className="border border-slate-300 px-4 py-2 text-left cursor-pointer">
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
          {data.map((user, index) => (
            <tr key={index} className="hover:bg-slate-50">
              <td className="border border-slate-300 px-4 py-2">
                {user.username}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {user.name.title}
              </td>
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
