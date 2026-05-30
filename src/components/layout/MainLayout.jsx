import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-slate-200">
      <Sidebar />
      <div className="flex-1 relative flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
