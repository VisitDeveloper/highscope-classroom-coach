import React, { Suspense, useState } from "react";
import { ConfigProvider, Spin } from "antd";
import { theme } from "antd";
import { darkTokens, lightTokens } from "./config/theme-token";
import { useTheme } from "./hooks/use-theme";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import ProtectedRoutes from "./routes/_protected-route";
import Dashboard from "./pages/Teacher/Dashboard";

// Page Lazy Loading
const Login = React.lazy(() => import("./pages/Login"));
const Notfound = React.lazy(() => import("./pages/Notfound"));

// ORG Admin Pages
const DashboardORGAdmin = React.lazy(() => import("./pages/OrgAdmin/Dashboard"));
const HomeOrgAdmin = React.lazy(() => import("./pages/OrgAdmin/Home"));

// Site Admin Pages
const DashboardSiteAdmin = React.lazy(() => import("./pages/SiteAdmin/Dashboard"));
const HomeSiteAdmin = React.lazy(() => import("./pages/SiteAdmin/Home"));

// Teacher Pages
const HomeTeacher = React.lazy(() => import("./pages/Teacher/Home"));

type UserRole = "org-admin" | "site-admin" | "teacher";

function App() {
  const { isDark, toggleTheme } = useTheme();

  const themeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: isDark ? darkTokens : lightTokens,
  };

  // مثال: user فعلی

  const [userRole, setUserRole] = useState<UserRole>("org-admin");

  const [isLogin, setIsLogin] = useState<boolean>(true)

  return (
    <ConfigProvider theme={themeConfig}>
      <Suspense fallback={<Spin size="large" style={{ display: "block", margin: "100px auto" }} />}>
        <Routes>
          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Redirect root / به داشبورد خودش */}
          <Route
            path="/"
            element={
              <Navigate
                to={
                  userRole === "org-admin"
                    ? "/org-admin/dashboard"
                    : userRole === "site-admin"
                      ? "/site-admin/dashboard"
                      : "/teacher/home"
                }
                replace
              />
            }
          />

          {/* ORG ADMIN */}
          <Route
            element={
              <ProtectedRoutes isLogin={isLogin} isAllowed={userRole === "org-admin"} userRole={userRole} />
            }
          >
            <Route element={<MainLayout isDark={isDark} toggleTheme={toggleTheme} />}>
              <Route path="/org-admin/dashboard" element={<DashboardORGAdmin />} />
              <Route path="/org-admin/home" element={<HomeOrgAdmin />} />
            </Route>
          </Route>

          {/* SITE ADMIN */}
          <Route
            element={
              <ProtectedRoutes isLogin={isLogin} isAllowed={userRole === "site-admin"} userRole={userRole} />
            }
          >
            <Route element={<MainLayout isDark={isDark} toggleTheme={toggleTheme} />}>
              <Route path="/site-admin/dashboard" element={<DashboardSiteAdmin />} />
              <Route path="/site-admin/home" element={<HomeSiteAdmin />} />
            </Route>
          </Route>

          {/* TEACHER */}
          <Route
            element={
              <ProtectedRoutes isLogin={isLogin} isAllowed={userRole === "teacher"} userRole={userRole} />
            }
          >
            <Route element={<MainLayout isDark={isDark} toggleTheme={toggleTheme} />}>
              <Route path="/teacher/home" element={<HomeTeacher />} />
              <Route path="/teacher/dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          {/* Notfound */}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
