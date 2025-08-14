import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const PRIMARY_COLOR = "#1273A6";

const linkData = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
  { label: "In Progress", link: "in-progress/in progress", icon: <MdOutlinePendingActions /> },
  { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
  { label: "Team", link: "team", icon: <FaUsers /> },
  { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    const isActive = path === el.link.split("/")[0];

    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200",
          isActive
            ? "bg-gray-100 text-gray-900 shadow-sm"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        <span
          className={clsx(
            "text-lg transition-colors duration-200",
            isActive ? "text-gray-900" : "text-gray-500"
          )}
        >
          {el.icon}
        </span>
        <span>{el.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5 bg-white border-r border-gray-200 shadow-sm">
      {/* Logo Section */}
      <h1 className="flex gap-2 items-center">
        <div
          className="p-2 rounded-full"
          style={{ backgroundColor: PRIMARY_COLOR }}
        >
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </div>
        <span className="text-2xl font-bold text-gray-900">TaskFloat</span>
      </h1>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col gap-y-2 py-4">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      {/* Footer / Settings */}
      <div>
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
          <MdSettings className="text-gray-500" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
