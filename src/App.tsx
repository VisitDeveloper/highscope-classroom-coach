import React, { Suspense, useState } from "react";
import { ConfigProvider, Spin } from "antd";
import { theme } from "antd";
import { lightTokens } from "./config/theme-token";
import { Routes, Route, Navigate } from "react-router-dom";
import { type UserRole } from './routes/_protected-route'
import { APP_ROUTES } from "./routes/routes";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoutes from "./routes/_protected-route";
import ErrorBoundary from "./pages/ErrorBoundry";

// General Page
const Login = React.lazy(() => import("./pages/Login"));
const Notfound = React.lazy(() => import("./pages/Notfound"));

// ORG Admin Pages
const ManageSiteOrgAdmin = React.lazy(() => import("./pages/OrgAdmin/ManageSite"));
const ManageClassroom = React.lazy(() => import("./pages/OrgAdmin/ManageClassroom"));
const CreateSiteOrgAdmin = React.lazy(() => import("./pages/OrgAdmin/CreateSite"));
const ReportsOrgAdmin = React.lazy(() => import("./pages/OrgAdmin/Reports"));
const ResourcesOrgAdmin = React.lazy(() => import("./pages/OrgAdmin/Resources"));
const ProfileOrgAdmin = React.lazy(() => import("./pages/OrgAdmin/Profile"));
const ManageStaff = React.lazy(() => import("./pages/OrgAdmin/ManageStaff"))
// const DashboardORGAdmin = React.lazy(() => import("./pages/OrgAdmin/Dashboard"));
// const ManagSite = React.lazy(() => import("./pages/OrgAdmin/ManageSite"));
// const ManageStassOrgAdmin = React.lazy(() => import("./pages/OrgAdmin/Dashboard"));
// const ManageClassRoomsOrgAdmin = React.lazy(() => import("./pages/OrgAdmin/Dashboard"));

// Site Admin Pages
const AssessmentsSiteAdmin = React.lazy(() => import("./pages/SiteAdmin/Assessments"));
const MaterialsSiteAdmin = React.lazy(() => import("./pages/SiteAdmin/MaterialsChecklist"));
const ReportSiteAdmin = React.lazy(() => import("./pages/SiteAdmin/Reports"));
const ResourcesSiteAdmin = React.lazy(() => import("./pages/SiteAdmin/Resources"));
const ProfileSiteAdmin = React.lazy(() => import("./pages/SiteAdmin/Profile"));
// Teacher Pages
const HomeTeacher = React.lazy(() => import("./pages/Teacher/Home"));
const DashboardTeacher = React.lazy(() => import("./pages/Teacher/Dashboard"));
const ProfileTeacher = React.lazy(() => import("./pages/Teacher/Profile"));
const TestErrorPage = React.lazy(() => import("./pages/testPage"));

function App() {
  const themeConfig = {
    algorithm: theme.defaultAlgorithm,
    token: lightTokens,
  };

  const handleError = (error: Error, info: React.ErrorInfo) => {
    // مثال: ارسال به Sentry یا API
    // Sentry.captureException(error, { extra: info });
    console.error("Logged to service:", error, info);
  };

  // مثال: user فعلی

  const [userRole] = useState<UserRole>("site-admin");

  const [isLogin] = useState<boolean>(true)

  return (
    <ErrorBoundary onError={handleError} resetKeys={[]}>
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
                      ? APP_ROUTES.ORG_ADMIN_MANAGE_SITE
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
              {/* isDark={isDark} toggleTheme={toggleTheme} */}
              <Route element={<MainLayout />}>
                <Route path={APP_ROUTES.ORG_ADMIN_MANAGE_SITE} element={<ManageSiteOrgAdmin />} />
                <Route path={APP_ROUTES.ORG_ADMIN_CREATE_SITE} element={<CreateSiteOrgAdmin />} />

                <Route path={APP_ROUTES.ORG_ADMIN_MANAGE_STAFF} element={<ManageStaff />} />
                <Route path={APP_ROUTES.ORG_ADMIN_MANAGE_CLASSROOMS} element={<ManageClassroom />} />

                <Route path={APP_ROUTES.ORG_ADMIN_REPORTS} element={<ReportsOrgAdmin />} />
                <Route path={APP_ROUTES.ORG_ADMIN_RESOURCES} element={<ResourcesOrgAdmin />} />
                <Route path={'/org-admin/test'} element={<TestErrorPage />} />
                <Route path={APP_ROUTES.ORG_ADMIN_PROFILE} element={<ProfileOrgAdmin />} />

                {/* <Route path={APP_ROUTES.} element={<ManageSiteOrgAdmin />} /> */}
                {/* <Route path={APP_ROUTES.ORG_ADMIN_MANAGE_STAFF} element={<HomeOrgAdmin />} />
                    <Route path={APP_ROUTES.ORG_ADMIN_MANAGE_CLASSROOMS} element={<HomeOrgAdmin />} />
               */}
              </Route>
            </Route>


            {/* SITE ADMIN */}
            <Route
              element={
                <ProtectedRoutes isLogin={isLogin} isAllowed={userRole === "site-admin"} userRole={userRole} />
              }
            >
              <Route element={<MainLayout />}>
                <Route path={APP_ROUTES.SITE_ADMIN_ASSESSMENTS} element={<AssessmentsSiteAdmin />} />
                <Route path={APP_ROUTES.SITE_ADMIN_MATERIALS_CHECKLIST} element={<MaterialsSiteAdmin />} />
                <Route path={APP_ROUTES.SITE_ADMIN_REPORTS} element={<ReportSiteAdmin />} />
                <Route path={APP_ROUTES.SITE_ADMIN_RESOURCES} element={<ResourcesSiteAdmin />} />
                <Route path={APP_ROUTES.SITE_ADMIN_PROFILE} element={<ProfileSiteAdmin />} />
              </Route>
            </Route>


            {/* TEACHER */}
            <Route
              element={
                <ProtectedRoutes isLogin={isLogin} isAllowed={userRole === "teacher"} userRole={userRole} />
              }
            >
              <Route element={<MainLayout />}>
                <Route path={APP_ROUTES.TEACHER_DASHBOARD} element={<DashboardTeacher />} />
                <Route path={APP_ROUTES.TEACHER_HOME} element={<HomeTeacher />} />
                <Route path={APP_ROUTES.TEACHER_PROFILE} element={<ProfileTeacher />} />
              </Route>
            </Route>

            {/* Notfound */}
            <Route path={APP_ROUTES.NOT_FOUND} element={<Notfound />} />
          </Routes>
        </Suspense>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
