import "./App.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/login";
import Dashboard from './pages/dashboard'
import Register from "./pages/register";
import ResetPass from "./pages/reset-password";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/reset" element={<ResetPass/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
