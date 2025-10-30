import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRoutesProps {
    isAllowed?: boolean; // آیا دسترسی به این route مجاز است؟
    isLogin?: boolean;   // آیا کاربر لاگین کرده؟
    userRole?: "org-admin" | "site-admin" | "teacher";
    loginPath?: string;  // مسیر صفحه لاگین
}

const defaultDashboards: Record<NonNullable<ProtectedRoutesProps["userRole"]>, string> = {
    "org-admin": "/org-admin/home",
    "site-admin": "/site-admin/home",
    "teacher": "/teacher/home",
};

const ProtectedRoutes = ({
    isAllowed = false,
    isLogin = false,
    userRole,
    loginPath = "/login",
}: ProtectedRoutesProps) => {
    const location = useLocation();

    // اگر لاگین نیست → به صفحه لاگین
    if (!isLogin) {
        return <Navigate to={loginPath} replace state={{ from: location }} />;
    }

    // اگر اجازه دسترسی دارد → outlet نمایش داده شود
    if (isAllowed) {
        return <Outlet />;
    }

    // کاربر لاگین دارد ولی اجازه ندارد → به داشبورد خودش هدایت شود
    if (userRole) {
        const targetPath = defaultDashboards[userRole];
        return <Navigate to={targetPath} replace state={{ from: location }} />;
    }

    // fallback به صفحه لاگین
    return <Navigate to={loginPath} replace state={{ from: location }} />;
};

export default ProtectedRoutes;
