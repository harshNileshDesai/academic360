// Import necessary dependencies from 'react' and 'react-router-dom'
import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './App.css'



import EditMarksheet from "./components/EditMarksheet";
import Settings from "./components/Settings";
import GetAllReports from "./pages/GetAllReports"
import Root from "./pages/Root";
import Dashboard from "./pages/Dashboard";
import DashboardHome from './pages/DashboardHome';
import AddStudent from "./pages/AddStudents";
import SearchStudent from './pages/SearchStudent';
import DeleteStudent from './pages/DeleteStudent';
import FilterMarksheets from './pages/FilterMarksheets';

// Create a browser router with specified routes
const router = createBrowserRouter([
  { path: "/", element: <Root /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "", element: <DashboardHome /> },
      { path: "filter-marksheets", element: <FilterMarksheets /> },
      { path: "add", element: <AddStudent /> },
      { path: "search", element: <SearchStudent /> },
      { path: "delete", element: <DeleteStudent /> },
      { path: "get-reports", element: <GetAllReports /> },
      { path: "edit", element: <EditMarksheet /> },
      { path: "settings", element: <Settings /> },
    ]
  }
]);

/**
 * @author: Harsh Nilesh Desai
 * 
 * App component represents the main application.
 * It wraps the application with the configured router.
 *
 * @returns {JSX.Element} The rendered App component
 */
const App = () => {
  return (
    <div id="academic360-app" className="academic360-app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App