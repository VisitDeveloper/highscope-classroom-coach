import React, { useEffect, useState } from "react";

import { Button, Layout, Menu, Select, theme, Typography } from "antd";
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

const { Header, Sider, Content, Footer } = Layout;
const { Option } = Select;

interface ArrayButtonOnHeaderType {
  title: string;
  icon: React.ReactElement | React.ReactNode;
  link?: string;
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
  const [userRole] = useState<UserRole>("org-admin");

  useEffect(() => {
    if (width < 768) {
      setCollapsed(true); // موبایل → پیشفرض بسته
    } else {
      setCollapsed(false); // دسکتاپ → پیشفرض باز
    }
  }, [width]);

  const ArrayButtonOnHeader: ArrayButtonOnHeaderType[] = [
    {
      title: t("mainlayout.campus_home"),
      icon: (
        <svg
          className="size-4"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.10913 9.50233C7.32869 9.52457 7.49994 9.70994 7.49994 9.93537V12.0649L7.49767 12.1093C7.47681 12.3142 7.31402 12.4771 7.10913 12.4979L7.06463 12.5002H3.93531L3.89081 12.4979C3.68601 12.4771 3.5231 12.3142 3.50227 12.1093L3.5 12.0649V9.93537C3.5 9.71002 3.67136 9.52467 3.89081 9.50233L3.93531 9.50007H7.06463L7.10913 9.50233ZM4.1385 11.8617H6.86172V10.1386H4.1385V11.8617Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.1092 7.50237C12.3288 7.5246 12.5 7.70997 12.5 7.9354V12.0649L12.4977 12.1093C12.4769 12.3142 12.3141 12.4771 12.1092 12.4979L12.0647 12.5002H8.93537L8.89087 12.4979C8.68607 12.477 8.52316 12.3142 8.50233 12.1093L8.50006 12.0649V7.9354C8.50006 7.71006 8.67143 7.52472 8.89087 7.50237L8.93537 7.5001H12.0647L12.1092 7.50237ZM9.13857 11.8617H11.8618V8.1386H9.13857V11.8617Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.10913 3.50215C7.32867 3.52438 7.4999 3.70979 7.49994 3.93518V8.06464L7.49767 8.10913C7.47686 8.31404 7.31406 8.47692 7.10913 8.49767L7.06463 8.49994H3.93531L3.89081 8.49767C3.68599 8.47682 3.52306 8.31397 3.50227 8.10913L3.5 8.06464V3.93518C3.50004 3.70986 3.67138 3.52448 3.89081 3.50215L3.93531 3.49988H7.06463L7.10913 3.50215ZM4.1385 7.86144H6.86172V4.13838H4.1385V7.86144Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.1092 3.50215C12.3287 3.52438 12.5 3.70979 12.5 3.93518V6.06467L12.4977 6.10916C12.4769 6.31405 12.3141 6.47696 12.1092 6.4977L12.0647 6.49997H8.93537L8.89087 6.4977C8.68607 6.47685 8.52315 6.31397 8.50233 6.10916L8.50006 6.06467V3.93518C8.5001 3.70987 8.67145 3.52448 8.89087 3.50215L8.93537 3.49988H12.0647L12.1092 3.50215ZM9.13857 5.86147H11.8618V4.13838H9.13857V5.86147Z"
            fill="currentColor"
          />
        </svg>
      ),
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
        width={width < 768 ? 180 : 235}
        collapsedWidth={width < 768 ? 0 : 80}
        collapsible
        collapsed={collapsed}
        // onCollapse={() => setCollapsed(!collapsed)}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Typography>
          {/* <Paragraph
                        className="demo-logo-vertical font-bold text-center mt-7! "
                        style={{
                            fontFamily: "Comic Neue, cursive",
                            fontSize: collapsed ? '5px' : '24px',
                            textShadow: `2px 2px 10px ${colorPrimary}`,

                        }}>
                        Classroom Coach
                    </Paragraph> */}
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
                className="text-lg h-14! w-14! transition duration-700 text-white!"
              />
            </div>
            <div className={`flex flex-row items-center md:gap-2 gap-1`}>
              {/* <Switch
               {/*  size="small"
                checked={isDark}
                className="border! border-solid border-white! p-1"
                onChange={toggleTheme}
                checkedChildren={<SunOutlined />}
                unCheckedChildren={<MoonOutlined />}
              /> */}

              <Select
                size={width < 950 ? "small" : "middle"}
                value={language}
                onChange={(value: string) => {
                  setLanguage(value);
                  i18n.changeLanguage(value);
                }}
                suffixIcon={null}
                prefix={<GlobeIcon className="size-4 text-white" />}
                className="custom-select shadow-none! border-2! border-solid! border-white! rounded-sm text-white!"
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
                    <Link to={item.link || "#"} key={item.title}>
                      <Button
                        type="primary"
                        className="shadow-none! border-2! border-solid! border-white!"
                        size={width < 950 ? "small" : "middle"}
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
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 ml-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
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
      </Layout>
    </Layout>
  );
};

export default MainLayout;
