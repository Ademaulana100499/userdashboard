import { FiChevronUp, FiChevronDown } from "react-icons/fi";
const DashboardContent = () => {
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
              Name
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
          {data.map((user, index) => (
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
