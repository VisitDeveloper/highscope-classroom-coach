import React, { Suspense, useState } from "react";
import { ConfigProvider, Spin } from "antd";
import { theme } from "antd";
import { darkTokens, lightTokens } from "./config/theme-token";
import { useTheme } from "./hooks/use-theme";
import { Routes, Route, Navigate } from "react-router-dom";
import { type UserRole } from './routes/_protected-route'
import { APP_ROUTES } from "./routes/routes";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoutes from "./routes/_protected-route";

// Page Lazy Loading
const Login = React.lazy(() => import("./pages/Login"));
const Notfound = React.lazy(() => import("./pages/Notfound"));

// ORG Admin Pages
const DashboardORGAdmin = React.lazy(() => import("./pages/OrgAdmin/Dashboard"));
const HomeOrgAdmin = React.lazy(() => import("./pages/OrgAdmin/Home"));

// Site Admin Pages
const AssessmentsSiteAdmin = React.lazy(() => import("./pages/SiteAdmin/Assessments"));
const MaterialsSiteAdmin = React.lazy(() => import("./pages/SiteAdmin/MaterialsChecklist"));
const ReportSiteAdmin = React.lazy(() => import("./pages/SiteAdmin/Reports"));
const ResourcesSiteAdmin = React.lazy(() => import("./pages/SiteAdmin/Resources"));



// Teacher Pages
const HomeTeacher = React.lazy(() => import("./pages/Teacher/Home"));
const DashboardTeacher = React.lazy(() => import("./pages/Teacher/Dashboard"));

function App() {
  const { isDark, toggleTheme } = useTheme();

  const themeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: isDark ? darkTokens : lightTokens,
  };

  // مثال: user فعلی

  const [userRole, setUserRole] = useState<UserRole>("site-admin");

  const [isLogin, setIsLogin] = useState<boolean>(true)

  return (
    <ConfigProvider theme={themeConfig}>
      <Suspense fallback={<Spin size="large" style={{ display: "block", margin: "100px auto" }} />}>
        <Routes>
          {/* Login */}
          <Route path={APP_ROUTES.LOGIN} element={<Login />} />

          {/* Redirect root / به داشبورد خودش */}
          {/* if in / route it can redirect to the dashboard */}
          <Route
            path="/"
            element={
              <Navigate
                to={
                  userRole === "org-admin"
                    ? APP_ROUTES.ORG_ADMIN_HOME
                    : userRole === "site-admin"
                      ? APP_ROUTES.SITE_ADMIN_ASSESSMENTS
                      : APP_ROUTES.TEACHER_HOME
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
              <Route path={APP_ROUTES.ORG_ADMIN_DASHBOARD} element={<DashboardORGAdmin />} />
              <Route path={APP_ROUTES.ORG_ADMIN_HOME} element={<HomeOrgAdmin />} />
            </Route>
          </Route>

          {/* SITE ADMIN */}
          <Route
            element={
              <ProtectedRoutes isLogin={isLogin} isAllowed={userRole === "site-admin"} userRole={userRole} />
            }
          >
            <Route element={<MainLayout isDark={isDark} toggleTheme={toggleTheme} />}>
              <Route path={APP_ROUTES.SITE_ADMIN_ASSESSMENTS} element={<AssessmentsSiteAdmin />} />
              <Route path={APP_ROUTES.SITE_ADMIN_MATERIALS_CHECKLIST} element={<MaterialsSiteAdmin />} />
              <Route path={APP_ROUTES.SITE_ADMIN_REPORTS} element={<ReportSiteAdmin />} />
              <Route path={APP_ROUTES.SITE_ADMIN_RESOURCES} element={<ResourcesSiteAdmin />} />
            </Route>
          </Route>

          {/* TEACHER */}
          <Route
            element={
              <ProtectedRoutes isLogin={isLogin} isAllowed={userRole === "teacher"} userRole={userRole} />
            }
          >
            <Route element={<MainLayout isDark={isDark} toggleTheme={toggleTheme} />}>
              <Route path={APP_ROUTES.TEACHER_DASHBOARD} element={<DashboardTeacher />} />
              <Route path={APP_ROUTES.TEACHER_HOME} element={<HomeTeacher />} />
            </Route>
          </Route>

          {/* Notfound */}
          <Route path={APP_ROUTES.NOT_FOUND} element={<Notfound />} />
        </Routes>
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
