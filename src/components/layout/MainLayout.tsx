import React, { useEffect, useState } from "react";

import { Button, Drawer, Dropdown, Layout, Menu, Select, theme, Typography, type MenuProps } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { useWindowSize } from "../../hooks/use-size";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import type { UserRole } from "./../../routes/_protected-route";
import { APP_ROUTES } from "./../../routes/routes";
import ClassRoomLogoComponent from "./../icon/logo";
import {
  BookOpenIcon,
  BuildingIcon,
  ChalkboardTeacherIcon,
  UserCircleIcon,
  UsersThreeIcon,
  BinocularsIcon,
  ListIcon,
  GlobeIcon,
  UserIcon,
  GearIcon,
  InfoIcon,
  SignOutIcon,
  ClipboardTextIcon,
} from "@phosphor-icons/react";
import CampusIcon from './../icon/campus-icon'

const { Header, Sider, Content, Footer } = Layout;
const { Option } = Select;

interface ArrayButtonOnHeaderType {
  title: string;
  icon: React.ReactElement | React.ReactNode;
  link?: string;
  key?: string | number;

}

const siderStyle: React.CSSProperties = {
  insetInlineStart: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

// interface MainLayoutProps {
//     toggleTheme: (checked: boolean) => void;
//     isDark: boolean;
// }
// props: MainLayoutProps
const MainLayout = () => {
  // const { toggleTheme, isDark } = props;
  const {
    token: { borderRadiusLG, colorPrimary, colorBgBase, colorTextSecondary },
  } = theme.useToken();
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();
  const [userRole] = useState<UserRole>("site-admin");

  useEffect(() => {
    if (width < 1190) {
      setCollapsed(true); // موبایل → پیشفرض بسته
    } else {
      setCollapsed(false); // دسکتاپ → پیشفرض باز
    }
  }, [width]);

  const ArrayButtonOnHeader: ArrayButtonOnHeaderType[] = [
    {
      title: t("mainlayout.campus_home"),
      link: '/login',
      icon: <CampusIcon className="size-4" />,
    },
    {
      title: t("mainlayout.user_profile"),
      icon: <UserIcon className="size-4" />,
      link:
        userRole === "org-admin"
          ? APP_ROUTES.ORG_ADMIN_PROFILE
          : userRole === "site-admin"
            ? APP_ROUTES.SITE_ADMIN_PROFILE
            : APP_ROUTES.TEACHER_PROFILE,
    },
    {
      title: t("mainlayout.setting"),
      icon: <GearIcon className="size-4" />,
    },
    {
      title: t("mainlayout.help"),
      icon: <InfoIcon className="size-4" />,
      link: "/test",
    },
    {
      title: t("mainlayout.logout"),
      icon: <SignOutIcon className="size-4" />,
    },
  ];

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: 'My Account',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '1',
      label: <Link to={APP_ROUTES.LOGIN}>{t("mainlayout.campus_home")}</Link>,
      icon: (
        <CampusIcon className="size-4" />
      )
    },
    {
      key: '2',
      label: <Link to={userRole === "org-admin"
        ? APP_ROUTES.ORG_ADMIN_PROFILE
        : userRole === "site-admin"
          ? APP_ROUTES.SITE_ADMIN_PROFILE
          : APP_ROUTES.TEACHER_PROFILE}>{t("mainlayout.user_profile")}</Link>,
      icon: <UserIcon className="size-4" />,
    },
    {
      key: '3',
      label: t("mainlayout.setting"),
      icon: <GearIcon className="size-4" />
    },
    {
      key: '4',
      label: t("mainlayout.help"),
      icon: <InfoIcon className="size-4" />
    },
    {
      key: '5',
      label: t("mainlayout.logout"),
      icon: <SignOutIcon className="size-4" />
    },
  ];

  //  org-admin menu Item
  const orgAdminArrayMenuItem = [
    {
      key: APP_ROUTES.ORG_ADMIN_MANAGE_SITE,
      icon: <BuildingIcon />,
      label: (
        <span
          tabIndex={1}
          style={{
            fontWeight:
              location.pathname === APP_ROUTES.ORG_ADMIN_MANAGE_SITE
                ? 600
                : 500,
          }}
        >
          {t("mainlayout.manage_site")}
        </span>
      ),
    },
    {
      key: APP_ROUTES.ORG_ADMIN_MANAGE_STAFF,
      icon: <UsersThreeIcon size="18" />,
      label: (
        <span
          tabIndex={2}
          style={{
            fontWeight:
              location.pathname === APP_ROUTES.ORG_ADMIN_MANAGE_STAFF
                ? 600
                : 500,
          }}
        >
          {t("mainlayout.manage_staff")}
        </span>
      ),
    },
    {
      key: APP_ROUTES.ORG_ADMIN_MANAGE_CLASSROOMS,
      icon: <ChalkboardTeacherIcon size="18" />,
      label: (
        <span
          tabIndex={3}
          style={{
            fontWeight:
              location.pathname === APP_ROUTES.ORG_ADMIN_MANAGE_CLASSROOMS
                ? 600
                : 500,
          }}
        >
          {t("mainlayout.manage_classroom")}
        </span>
      ),
    },
    {
      key: APP_ROUTES.ORG_ADMIN_REPORTS,
      icon: <UserCircleIcon size="18" />,
      label: (
        <span
          tabIndex={4}
          style={{
            fontWeight:
              location.pathname === APP_ROUTES.ORG_ADMIN_REPORTS ? 600 : 500,
          }}
        >
          {t("mainlayout.reports")}
        </span>
      ),
    },

    {
      key: APP_ROUTES.ORG_ADMIN_RESOURCES,
      icon: <BookOpenIcon size="18" />,
      label: (
        <span
          tabIndex={5}
          style={{
            fontWeight:
              location.pathname === APP_ROUTES.ORG_ADMIN_RESOURCES ? 600 : 500,
          }}
        >
          {t("mainlayout.resources")}
        </span>
      ),
    },
  ];

  // site-admin menu item
  const siteAdminArrayMenuItem = [
    {
      key: APP_ROUTES.SITE_ADMIN_ASSESSMENTS,
      icon: <BinocularsIcon size="18" />,
      label: (
        <span
          tabIndex={1}
          style={{
            fontWeight:
              location.pathname === APP_ROUTES.SITE_ADMIN_ASSESSMENTS
                ? 600
                : 500,
          }}
        >
          {t("mainlayout.assessments")}
        </span>
      ),
    },
    {
      key: APP_ROUTES.SITE_ADMIN_MATERIALS_CHECKLIST,
      icon: <ListIcon size="18" />,
      label: (
        <span
          tabIndex={2}
          style={{
            fontWeight:
              location.pathname === APP_ROUTES.SITE_ADMIN_MATERIALS_CHECKLIST
                ? 600
                : 500,
          }}
        >
          {t("mainlayout.materials_checklist")}
        </span>
      ),
    },
    {
      key: APP_ROUTES.SITE_ADMIN_REPORTS,
      icon: <UserCircleIcon size="18" />,
      label: (
        <span
          tabIndex={3}
          style={{
            fontWeight:
              location.pathname === APP_ROUTES.SITE_ADMIN_REPORTS ? "600" : 500,
          }}
        >
          {t("mainlayout.reports")}
        </span>
      ),
    },
    {
      key: APP_ROUTES.SITE_ADMIN_RESOURCES,
      icon: <BookOpenIcon size="18" />,
      label: (
        <span
          tabIndex={4}
          style={{
            fontWeight:
              location.pathname === APP_ROUTES.SITE_ADMIN_RESOURCES
                ? "600"
                : 500,
          }}
        >
          {t("mainlayout.resources")}
        </span>
      ),
    },
  ];

  const teacherArrayMenuItem = [
    {
      key: "/teacher/dashboard",
      icon: <ClipboardTextIcon />,
      label: <span tabIndex={4}>{t("mainlayout.resources")}</span>,
    },
  ];


  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    if (width > 1024) {
      setOpen(false)
    }
  }, [width])


  return (
    <Layout>
      <Sider
        className={`overflow-auto h-screen sticky! top-0 bottom-0 shadow-lg transition duration-700! ease-in-out`}
        // ${isDark ? ' border-r-white bg-white/10 backdrop-blur-3xl' : 'border-r-black bg-black/20 backdrop-blur-3xl'}
        style={{
          ...siderStyle,
          backgroundColor: colorBgBase,
          // backgroundImage: isDark ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/bg-dark-side-1.jpg')` : `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('/images/bg-side-6.jpg')`,
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          // backdropFilter: 'blur(22px)', // برای blur
        }}
        trigger={null}
        width={width < 1024 ? 0 : 235}
        collapsedWidth={width < 1024 ? 0 : 80}
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Typography>
          <div>
            <ClassRoomLogoComponent width={"100%"} height={"100"} />
          </div>
        </Typography>
        <Menu
          className="text-white border-none! bg-transparent! sidebar-menu "
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(info) => {
            navigate(`${info.key}`);
          }}
          selectedKeys={[location.pathname]}
          // rule base menu item
          items={
            userRole === "org-admin"
              ? orgAdminArrayMenuItem
              : userRole === "site-admin"
                ? siteAdminArrayMenuItem
                : teacherArrayMenuItem
          }
        />
      </Sider>
      {/* <Layout className={cn({ "bg-[#D1D5DB]": !isDark })}> */}
      <Layout>
        <Header
          className={`sticky top-0 z-10 w-full flex items-center shadow-lg h-[70px]! p-4!`}
          style={{ background: colorPrimary }}
        >
          <div className="flex flex-row justify-between items-center w-full ">
            <div className="flex flex-row gap-[15] items-center ">
              <Button
                type="text"
                icon={<ListIcon className="size-6 text-white" />}
                onClick={() => setCollapsed(!collapsed)}
                className="text-lg h-14! w-14! transition duration-700 text-white! lg:block! hidden!"
              />

              {/* Open Drawer   */}
              <Button
                type="text"
                icon={<ListIcon className="size-6 text-white" />}
                onClick={showDrawer}
                className="text-lg h-14! w-14! transition duration-700 text-white! visisble! lg:hidden!"
              />

              <div className="flex flex-col items-start justify-center gap-0.5! ml-1!">
                <Typography.Paragraph className="h-fit! mb-0!  text-xs! xl:text-sm!" style={{ color: colorTextSecondary }}>
                  Welcome Reza Assar
                </Typography.Paragraph>
                <Typography.Paragraph className="h-fit! mb-0! text-xs! xl:text-sm!" style={{ color: colorTextSecondary }}>
                  Admin
                </Typography.Paragraph>
              </div>


            </div>
            <div className={`flex flex-row items-center justify-center gap-4 md:gap-2`}>
              {/* <Switch
               {/*  size="small"
                checked={isDark}
                className="border! border-solid border-white! p-1"
                onChange={toggleTheme}
                checkedChildren={<SunOutlined />}
                unCheckedChildren={<MoonOutlined />}
              /> */}

              <Select
                size={width < 1024 ? "small" : "middle"}
                value={language}
                onChange={(value: string) => {
                  setLanguage(value);
                  i18n.changeLanguage(value);
                }}
                suffixIcon={null}
                prefix={<GlobeIcon className="size-4 text-white" />}
                className="custom-select shadow-none! border-2! border-solid! border-white! rounded-sm text-white! mt-0.5!"
                style={{
                  backgroundColor: colorPrimary,
                  color: `${colorTextSecondary} !important`,
                  height: "32px",
                  margin: "-5px 0 0 0",
                }}
                variant="borderless"
                children={
                  <>
                    <Option value="en">En</Option>
                    <Option value="es">Es</Option>
                    <Option value="fr">Fr</Option>
                  </>
                }
              />

              {ArrayButtonOnHeader.map((item: ArrayButtonOnHeaderType) => {
                return (
                  <>
                    <Link to={item.link || "#"} key={item.title} className="lg:block hidden mt-2!">
                      <Button
                        type="primary"
                        className="shadow-none! border-2! border-solid! border-white! "
                        size={"small"}
                      >
                        {item.icon}
                        {width < 768 ? null : (
                          <span className="text-xs">{item.title}</span>
                        )}
                      </Button>
                    </Link>
                  </>
                );
              })}
              <div className="lg:block hidden  w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 ml-2 ">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <Dropdown menu={{ items }} trigger={['click']} >
                <div className="visisble lg:hidden cursor-pointer  w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 ml-2">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <div className="p-1! my-0.5! mx-4!"></div>

        <Content
          className="min-h-[280px] p-6! my-3.5! mx-4!"
          style={{
            background: colorBgBase,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer className="text-center! h-5! text-xs!">
          Classroom Coach ©{new Date().getFullYear()}{" "}
          {t("mainlayout.create_messgae")}
        </Footer>

        {open && <Drawer
          title={
            <ClassRoomLogoComponent width={"100%"} height={"100"} />
          }
          // closeIcon={<ClosedCaptioningIcon />}
          closable={true}
          placement={'left'}
          onClose={onClose}
          open={open}
          key={'left'}
          styles={{
            header: {
              backgroundColor: colorBgBase,

            },
            body: {
              backgroundColor: colorBgBase,
              padding: 0,
              margin: 0

            }
          }}
          width={width < 510 ? 180 : 240}
          destroyOnHidden={true}
        >
          <Menu
            style={{
              padding: 0,
              margin: 0,
              borderRight: 0, // حذف حاشیه راست (اختیاری)
            }}
            onClick={(info) => {
              navigate(`${info.key}`);
            }}
            mode="inline"
            selectedKeys={[location.pathname]}
            items={userRole === "org-admin"
              ? orgAdminArrayMenuItem
              : userRole === "site-admin"
                ? siteAdminArrayMenuItem
                : teacherArrayMenuItem} />

        </Drawer>}
      </Layout>
    </Layout >
  );
};

export default MainLayout;
