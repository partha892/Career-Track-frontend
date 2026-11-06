import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddApplication from "./pages/AddApplication";
import EditApplication from "./pages/EditApplication";
import ApplicationDetails from "./pages/ApplicationDetails";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path="/login"
        element={
          user ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />

      <Route
        path="/register"
        element={
          user ? <Navigate to="/dashboard" replace /> : <Register />
        }
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/applications" element={<Applications />} />

          <Route
            path="/applications/add"
            element={<AddApplication />}
          />

          <Route
            path="/applications/edit/:id"
            element={<EditApplication />}
          />

          <Route
            path="/applications/:id"
            element={<ApplicationDetails />}
          />

          <Route path="/profile" element={<Profile />} />

        </Route>
      </Route>

      {/* Default Route */}
      <Route
        path="/"
        element={
          <Navigate
            to={user ? "/dashboard" : "/login"}
            replace
          />
        }
      />

      <Route
        path="/forgot-password"
        element={
          user ? <Navigate to="/dashboard" replace /> : <ForgotPassword />
        }
      />

      <Route
        path="/reset-password/:token"
        element={
          user ? <Navigate to="/dashboard" replace /> : <ResetPassword />
        }
      />
      <Route
        path="/verify-email/:token"
        element={<VerifyEmail />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;