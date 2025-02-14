import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardContent from "@/components/DashboardContent";
const Dashboard = () => {
  return (
    <>
      <Head>
        <title>UserDashboard</title>
      </Head>
      <div className="flex bg-indigo-50">
        <Sidebar />
        <DashboardContent />
      </div>
    </>
  );
};

export default Dashboard;
