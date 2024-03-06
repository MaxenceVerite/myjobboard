// src/App.js
import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import HomePage from "./routes/HomePage";
import Layout from "./routes/common/Layout";
import DocumentPage from "./routes/documents/DocumentPage";
import AuthForm from "./components/authentication/AuthForm";
import RegisterForm from "./components/authentication/RegisterForm";
import AuthProvider from "./providers/AuthProvider";
import Notifier from "./components/notifications/Notifier";
import OpportunitiesPage from "./routes/opportunities/OpportunitiesPage";
import { RootState } from "./store/store";
import OpportunityDetailPage from "./routes/opportunities/OpportunityDetailContent";
import OpportunitiesListContent from "./routes/opportunities/OpportunitiesListContent";
import AuthLayout from "./routes/authentication/AuthLayout";
import "./i18n";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { ModalProvider } from "./contexts/ModalContext";
import GlobalModal from "./components/common/modals/GlobalModal";
import SheetPage from "./routes/SheetPage";

function App() {
  const isConnected = useSelector((state: RootState) => state.auth.isConnected);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isConnected) {
      navigate('/login', { state: { from: location } });
    }
  }, [isConnected, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ModalProvider>
          <GlobalModal />
          <Notifier />
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route path="/login" element={<AuthForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Route>
            {isConnected && (
              <Route path="/" element={<Layout />}>
                <Route path="/dashboard" element={<HomePage />} />
                <Route path="opportunities" element={<OpportunitiesPage />}>
                  <Route index element={<OpportunitiesListContent />} />
                  <Route path=":id" element={<OpportunityDetailPage />} />
                </Route>
                <Route path="/sheets" element={<SheetPage />} />
                <Route path="/documents" element={<DocumentPage />} />
                <Route path="/profile" element={<HomePage />} />
              </Route>
            )
            }
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
