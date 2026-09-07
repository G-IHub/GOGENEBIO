import { Routes, Route } from "react-router-dom";
import Hub from "./Pages/Hub.jsx";
import Host from "./Pages/Host.jsx";
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
        <Route path="/" element={<Hub />} />
        <Route path="/host" element={<Host />} />
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
