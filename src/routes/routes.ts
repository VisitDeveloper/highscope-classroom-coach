
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
    ORG_ADMIN_MANAGE_SITE: `${UserRoleConstant.orgAdmin}/manage-site`,
    ORG_ADMIN_CREATE_SITE: `${UserRoleConstant.orgAdmin}/manage-site/create`,
    ORG_ADMIN_MANAGE_STAFF: `${UserRoleConstant.orgAdmin}/manage-staff`,
    ORG_ADMIN_MANAGE_CLASSROOMS: `${UserRoleConstant.orgAdmin}/manage-classroms`,
    ORG_ADMIN_REPORTS: `${UserRoleConstant.orgAdmin}/reports`,
    ORG_ADMIN_RESOURCES: `${UserRoleConstant.orgAdmin}/resources`,
    ORG_ADMIN_PROFILE: `${UserRoleConstant.orgAdmin}/profile`,

    // site-admin rule routes
    SITE_ADMIN_ASSESSMENTS: `${UserRoleConstant.siteAdmin}/assessments`,
    SITE_ADMIN_MATERIALS_CHECKLIST: `${UserRoleConstant.siteAdmin}/materials`,
    SITE_ADMIN_REPORTS: `${UserRoleConstant.siteAdmin}/reports`,
    SITE_ADMIN_RESOURCES: `${UserRoleConstant.siteAdmin}/resources`,
    SITE_ADMIN_PROFILE: `${UserRoleConstant.siteAdmin}/profile`,



    // teacher rule routes
    TEACHER_DASHBOARD: `${UserRoleConstant.teacher}/dashboard`,
    TEACHER_HOME: `${UserRoleConstant.teacher}/home`,
    TEACHER_PROFILE: `${UserRoleConstant.teacher}/profile`,

    NOT_FOUND: '*'
}
