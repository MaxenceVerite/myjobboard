import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './routes/LoginPage';
import HomePage from "./routes/HomePage";
import Layout from "./routes/navigation/Layout";
import DocumentPage from "./routes/DocumentPage";
import RegisterPage from "./routes/RegisterPage";
import Authent from "./routes/authentication/AuthenticatedComponent";
// autres imports

function App() {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Authent><Layout /></Authent>}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/opportunities" element={<HomePage />} />
          <Route path="/process-notes" element={<HomePage />} />
          <Route path="/documents" element={<DocumentPage />} />
          <Route path="/profile" element={<HomePage />} />
          
        </Route>
    </Routes>
  );
}

export default App;
