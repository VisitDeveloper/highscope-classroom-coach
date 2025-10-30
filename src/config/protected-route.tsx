import { Navigate, Outlet } from "react-router";

export type UserRole = "orgadmin" | "site-admin" | "teacher";

interface ProtectedRouteProps {
    allowedRole: UserRole;
    userRole: UserRole;
}

const ProtectedRoute = ({ allowedRole, userRole }: ProtectedRouteProps) => {
    if (userRole !== allowedRole) {
        return <Navigate to={`/${userRole}/firstpage-of-${userRole}`} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
