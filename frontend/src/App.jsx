import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import MyResumes from "./pages/MyResumes";
import Interview from "./pages/Interview";
import Report from "./pages/Report";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/upload"
      element={
        <ProtectedRoute>
          <UploadResume />
        </ProtectedRoute>
      }
    />

    <Route
      path="/resumes"
      element={
        <ProtectedRoute>
          <MyResumes />
        </ProtectedRoute>
      }
    />

    <Route
      path="/interview/:id"
      element={
        <ProtectedRoute>
          <Interview />
        </ProtectedRoute>
      }
    />

    <Route
      path="/report/:id"
      element={
        <ProtectedRoute>
          <Report />
        </ProtectedRoute>
      }
    />
  </Routes>
</BrowserRouter>
  );
}

export default App;