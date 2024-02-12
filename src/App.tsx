// src/App.js
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import Layout from "./routes/navigation/Layout";
import DocumentPage from "./routes/DocumentPage";
import RegisterPage from "./routes/RegisterPage";
import AuthProvider from "./providers/AuthProvider";
import Notifier from "./components/notifications/Notifier";
import OpportunitiesPage from "./routes/opportunities/OpportunitiesPage";
import { RootState } from "./store/store";
import OpportunityDetailPage from "./routes/opportunities/OpportunityDetailContent";
import OpportunitiesListContent from "./routes/opportunities/OpportunitiesListContent";

function App() {
  const isConnected = useSelector((state: RootState) => state.auth.isConnected);
  const location = useLocation();

  return (
    <AuthProvider>
      <Notifier />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {isConnected ? (
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="opportunities" element={<OpportunitiesPage />}>
              <Route index element={<OpportunitiesListContent />} /> 
              <Route path=":id" element={<OpportunityDetailPage />} />
            </Route>
            <Route path="/documents" element={<DocumentPage />} />
            <Route path="/profile" element={<HomePage />} />
          </Route>
        ) : (
          <Route
            path="*"
            element={
              <Navigate to="/login" state={{ from: location }} replace />
            }
          />
        )}
      </Routes>
    </AuthProvider>
  );
}

export default App;
