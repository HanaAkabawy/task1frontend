import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import UsersTable from './Components/UsersTable';
import EditUserPage from './Components/EditUserPage'; 

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpass" element={<ForgotPassword />} /> 
        <Route path="/resetpass" element={<ResetPassword />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/edit-user/:id" element={<EditUserPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
