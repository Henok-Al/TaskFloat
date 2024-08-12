import {
  Routes,
  Route,
  Navigate,
  replace,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Tasks from "./Tasks";
import Users from "./Users";
import TaskDetail from "./TaskDetail";
import Trash from "./pages/Trash";
import { Toaster } from "sonner";

const Login = () => {
  return (
    <main className="w-full min-h-screen bg-[#f2f4f6]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetail />} />

          <Route path="/log-in" element={<Login />} />
        </Route>
      </Routes>

      <Toaster richColors />
    </main>
  );
};

export default Login;
