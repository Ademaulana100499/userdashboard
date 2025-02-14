import React from "react";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex bg-indigo-50">
      <Sidebar />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;

const DashboardContent = () => <div className="h-[200vh] w-full"></div>;
