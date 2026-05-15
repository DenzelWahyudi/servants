import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Schedule } from "./pages/Schedule";
import { Openings } from "./pages/Openings";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CreateService } from "./pages/CreateService";
import { RegisterAdmin } from "./pages/RegisterAdmin";
import { LoginAdmin } from "./pages/LoginAdmin";
import { AdminServices } from "./pages/AdminServices";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes — anyone can access */}
          <Route path="/register" element={<Register />} />
          <Route path="/admin/register" element={<RegisterAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/service/create" element={<CreateService />} />

          {/* Protected routes — must be logged in */}
          <Route path="/" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          <Route path="/schedule" element={
            <ProtectedRoute><Schedule /></ProtectedRoute>
          } />
          <Route path="/openings" element={
            <ProtectedRoute><Openings /></ProtectedRoute>
          } />
          <Route path="/admin/services" element={
            <ProtectedRoute requiredRole="admin"><AdminServices /></ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}