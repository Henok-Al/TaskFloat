import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Tasks from "./Tasks";
import Users from "./Users";
import Trash from "./Trash";
import TaskDetail from "./TaskDetail";

const Login = () => {
  return (
    <main className="w-full min-h-screen bg-[#f2f4f6]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/task/:id" element={<TaskDetail />} />

          <Route path="/log-in" element={<Login />} />
        </Route>
      </Routes>
    </main>
  );
};

export default Login;
