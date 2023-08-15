import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/Error";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ProtectedRoute from "./components/core/Auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import Settings from "./pages/Settings";
import Bug from "./pages/Bug";
import BugCreateForm from "./components/core/Dashboard/BugCreateForm";
import { useSelector } from "react-redux";
import EditBugTes from "./components/core/Dashboard/EditBugTes";
import EditBugDev from "./components/core/Dashboard/EditBugDev";
function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <>
      <div className="flex flex-col">

          <Navbar />
       
        <div className="sm:h-full md:h-screen lg:h-screen ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <OpenRoute>
                  <Login />
                </OpenRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <OpenRoute>
                  <Signup />
                </OpenRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <OpenRoute>
                  <ResetPassword />
                </OpenRoute>
              }
            />
            <Route
              path="/update-password"
              element={
                <OpenRoute>
                  <UpdatePassword />
                </OpenRoute>
              }
            />
            <Route
              path="/verify-email"
              element={
                <OpenRoute>
                  <VerifyEmail />
                </OpenRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <OpenRoute>
                  <ResetPassword />
                </OpenRoute>
              }
            />
            <Route
              path="/update-password/:id"
              element={
                <OpenRoute>
                  <UpdatePassword />
                </OpenRoute>
              }
            />
            <Route
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard/my-profile" element={<MyProfile />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/dashboard/bugs" element={<Bug />} />

              {user && user.role === "Tester" && (
                <Route
                  path="/dashboard/create-bug"
                  element={<BugCreateForm />}
                />
              )}
              {user && user.role === "Tester" && (
                <Route
                  path="/dashboard/editTestBug/:id"
                  element={<EditBugTes />}
                />
              )}
              {user && user.role === "Developer" && (
                <Route
                  path="/dashboard/editDevBug/:id"
                  element={<EditBugDev />}
                />
              )}
            </Route>

            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
