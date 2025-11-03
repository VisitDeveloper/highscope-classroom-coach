import { Navigate, Outlet, useLocation } from "react-router-dom";
import { APP_ROUTES } from "./routes";

export type UserRole = "org-admin" | "site-admin" | "teacher";

interface ProtectedRoutesProps {
    isAllowed?: boolean; // is user can see this route ?
    isLogin?: boolean;
    userRole?: UserRole;
    loginPath?: string;  // login route  
}

const defaultDashboards: Record<NonNullable<ProtectedRoutesProps["userRole"]>, string> = {
    "org-admin": APP_ROUTES.ORG_ADMIN_MANAGE_SITE,
    "site-admin": APP_ROUTES.SITE_ADMIN_ASSESSMENTS,
    "teacher": APP_ROUTES.TEACHER_HOME,
};

const ProtectedRoutes = ({
    isAllowed = false,
    isLogin = false,
    userRole,
    loginPath = APP_ROUTES.LOGIN,
}: ProtectedRoutesProps) => {
    const location = useLocation();

    // if is not login back to the login page 
    if (!isLogin) {
        return <Navigate to={loginPath} replace state={{ from: location }} />;
    }

    // if allow then can see the outlet 
    if (isAllowed) {
        return <Outlet />;
    }

    // it should check user role ro route to the exat role
    if (userRole) {
        const targetPath = defaultDashboards[userRole];
        return <Navigate to={targetPath} replace state={{ from: location }} />;
    }


    // fallback to the login 
    return <Navigate to={loginPath} replace state={{ from: location }} />;
};

export default ProtectedRoutes;
