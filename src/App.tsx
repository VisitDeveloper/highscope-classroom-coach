import React from "react";
import { ConfigProvider, } from "antd";
import { theme } from "antd";
import { darkTokens, lightTokens } from './config/theme-token';
import { useTheme } from './hooks/use-theme';
import MainLayout from "./components/layout/MainLayout";
import { Route, Routes } from "react-router";

// Code Spliting
const Dashboard = React.lazy(() => import('./components/Form/testPage'));
const Notfound = React.lazy(() => import('./pages/Notfound'));
const ManageClassRoom = React.lazy(() => import('./pages/Home'));

const CreateClassRoom = React.lazy(() => import('./pages/CreateClassRoom'));
const CreateSiteForm = React.lazy(() => import('./pages/CreateSite'));

const Reports = React.lazy(() => import('./pages/Reports'));
const Resources = React.lazy(() => import('./pages/Resources'));

function App() {
  const { isDark, toggleTheme } = useTheme();
  const themeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: isDark ? darkTokens : lightTokens,
  };

  return (
    <>
      <ConfigProvider theme={themeConfig}>
        <Routes>

          <Route path="/" element={<MainLayout toggleTheme={toggleTheme} isDark={isDark} ><ManageClassRoom /></MainLayout>} />
          {/* <Route path="/sitemanagement" element={<MainLayout toggleTheme={toggleTheme} isDark={isDark}><Dashboard /></MainLayout>} /> */}
          <Route path="/create-classroom" element={<MainLayout toggleTheme={toggleTheme} isDark={isDark}>
            <CreateClassRoom />
          </MainLayout>} />

          <Route path="/create-site" element={<MainLayout toggleTheme={toggleTheme} isDark={isDark}>
            <CreateSiteForm />
          </MainLayout>} />


          <Route path="/reports" element={<MainLayout toggleTheme={toggleTheme} isDark={isDark}>
            <Reports />
          </MainLayout>} />

          <Route path="/resources" element={<MainLayout toggleTheme={toggleTheme} isDark={isDark}>
            <Resources />
          </MainLayout>} />

          <Route path="/test" element={<MainLayout toggleTheme={toggleTheme} isDark={isDark}>
            <Dashboard />
          </MainLayout>} />

          <Route path="*" element={<MainLayout toggleTheme={toggleTheme} isDark={isDark}>
            <Notfound />
          </MainLayout>} />


        </Routes>
      </ConfigProvider>

    </>
  )
}

export default App
