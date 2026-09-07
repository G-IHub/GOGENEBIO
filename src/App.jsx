import { Routes, Route, Navigate } from "react-router-dom";
import GoGeneBio from "./Pages/GoGeneBio.jsx";
import Form from "./Pages/Form.jsx";
import Auth from "./Pages/Auth.jsx";
import Testimonial from "./Pages/Testimonial.jsx";
import ClosedForm from "./Pages/ClosedForm.jsx";
import AdminLogin from "./Pages/AdminLogin.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

const App = () => {
  return (
    <div className="">
      <Routes>
        {/* Root will become the Global Outreach hub. For now it points at
            the GoGeneBio program page so nothing breaks for participants. */}
        <Route path="/" element={<Navigate to="/gogenbio" replace />} />
        <Route path="/gogenbio" element={<GoGeneBio />} />
        <Route path="/form" element={<Form />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
