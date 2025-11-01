
const UserRoleConstant = {
    orgAdmin: '/org-admin',
    siteAdmin: '/site-admin',
    teacher: '/teacher'
}

export const APP_ROUTES = {
    LOGIN: "/login",

    // org-admin rule routes
    ORG_ADMIN_DASHBOARD: `${UserRoleConstant.orgAdmin}/dashboard`,
    ORG_ADMIN_HOME: `${UserRoleConstant.orgAdmin}/home`,

    // site-admin rule routes
    SITE_ADMIN_ASSESSMENTS: `${UserRoleConstant.siteAdmin}/assessments`,
    SITE_ADMIN_MATERIALS_CHECKLIST: `${UserRoleConstant.siteAdmin}/materials`,
    SITE_ADMIN_REPORTS: `${UserRoleConstant.siteAdmin}/reports`,
    SITE_ADMIN_RESOURCES: `${UserRoleConstant.siteAdmin}/resources`,



    // teacher rule routes
    TEACHER_DASHBOARD: `${UserRoleConstant.teacher}/dashboard`,
    TEACHER_HOME: `${UserRoleConstant.teacher}/home`,

    NOT_FOUND: '*'
}
