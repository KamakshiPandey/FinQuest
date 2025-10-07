import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className='flex flex-row w-full min-h-screen'>
      <Sidebar />
      <div className='flex-1 overflow-auto bg-bgWhite'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
