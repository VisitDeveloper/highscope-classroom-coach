import React, { useEffect, useState } from 'react';
import {
    ClusterOutlined,
    GlobalOutlined,
    InfoCircleOutlined,
    LayoutOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoonOutlined,
    SettingOutlined,
    SnippetsOutlined,
    SunOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Select, Switch, theme, Typography } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useWindowSize } from '../../hooks/use-size';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Book1, Profile2User, SecurityUser } from 'iconsax-reactjs';

const { Header, Sider, Content, Footer } = Layout;
const { Paragraph } = Typography;
const { Option } = Select;

interface ArrayButtonOnHeaderType {
    title: string;
    icon: React.ReactElement | React.ReactNode;
    link?: string;
}

const siderStyle: React.CSSProperties = {
    insetInlineStart: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

interface MainLayoutProps {
    toggleTheme: (checked: boolean) => void;
    isDark: boolean;
}

const MainLayout = (props: MainLayoutProps) => {
    const { toggleTheme, isDark } = props;
    const {
        token: { colorBgContainer, borderRadiusLG, colorPrimary, colorText },
    } = theme.useToken();
    const { t } = useTranslation();
    const [language, setLanguage] = useState(i18n.language || 'en');
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { width } = useWindowSize();

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
            icon: <LayoutOutlined />
        },
        {
            title: t("mainlayout.user_profile"),
            icon: <UserOutlined />
        },
        {
            title: t("mainlayout.setting"),
            icon: <SettingOutlined />
        },
        {
            title: t("mainlayout.help"),
            icon: <InfoCircleOutlined />,
            link: '/test'
        },
        {
            title: t("mainlayout.logout"),
            icon: <LogoutOutlined />
        }
    ]



    return (
        <Layout>

            <Sider
                className={`overflow-auto h-screen sticky! top-0 bottom-0 shadow-2xl border-r! 
                    ${isDark ? ' border-r-white bg-white/10 backdrop-blur-3xl' : 'border-r-black bg-black/20 backdrop-blur-3xl'}`}
                style={{
                    ...siderStyle, backgroundImage: isDark ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/bg-dark-side-1.jpg')` : `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('/images/bg-side-6.jpg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backdropFilter: 'blur(22px)', // برای blur

                }}
                trigger={null}
                width={width < 768 ? 180 : 235}
                collapsedWidth={width < 768 ? 0 : 80}
                collapsible
                collapsed={collapsed}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >

                <Typography>
                    <Paragraph
                        className="demo-logo-vertical font-bold text-center mt-7! "
                        style={{
                            fontFamily: "Comic Neue, cursive",
                            fontSize: collapsed ? '5px' : '24px',
                            textShadow: `2px 2px 10px ${colorPrimary}`,

                        }}>
                        Classroom Coach
                    </Paragraph>
                    <div>

                    </div>
                </Typography>
                <Menu
                    className='text-white border-none! bg-transparent! sidebar-menu '
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={(info) => {
                        navigate(`${info.key}`);

                    }}
                    selectedKeys={[location.pathname]}
                    items={[
                        {
                            key: '/org-admin/home',
                            icon: <ClusterOutlined />,
                            label: <span tabIndex={1}>
                                {t("mainlayout.manage_site")}
                            </span>,
                        },
                        {
                            key: '/site-admin/dashboard',
                            icon: <SecurityUser size="20" color={location.pathname === '/' ? "#fff" : colorText} />,
                            label: <span tabIndex={2}>
                                {t("mainlayout.manage_staff")}
                            </span>,
                        },
                        {
                            key: '/site-admin/home',
                            icon: <Profile2User size="20" color={location.pathname === '/' ? "#fff" : colorText} />,
                            label: <span tabIndex={3}>
                                {t("mainlayout.manage_classroom")}
                            </span>,
                        },
                        {
                            key: '/teacher/dashboard',
                            icon: <SnippetsOutlined />,
                            label: <span tabIndex={4}>{t("mainlayout.reports")}</span>,
                        },
                        {
                            key: '/teacher/home',
                            icon: <Book1 size="20" color={location.pathname === '/resources' ? "#fff" : colorText} />,
                            label: <span tabIndex={5}>
                                {t("mainlayout.resources")}
                            </span>,
                        },


                    ]}
                />
            </Sider>
            <Layout>
                <Header className={`sticky top-0 z-10 w-full flex items-center h-[90px] p-4! border-b! ${isDark ? ' border-b-white!' : 'border-b-black!'}`} style={{ background: colorBgContainer }}>
                    <div className='flex flex-row justify-between items-center w-full '>

                        <div className='flex flex-row gap-[15] items-center'>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                className='text-lg h-14! w-14!'
                            />
                        </div>
                        <div className={`flex flex-row items-center md:gap-2 gap-1`} >
                            <Switch size='small' checked={isDark} onChange={toggleTheme}
                                checkedChildren={<SunOutlined />}
                                unCheckedChildren={<MoonOutlined />} />


                            <Select
                                size={width < 950 ? "small" : "middle"}
                                value={language}
                                onChange={(value: string) => {
                                    setLanguage(value);
                                    i18n.changeLanguage(value);
                                }}
                                suffixIcon={<GlobalOutlined />}
                                children={
                                    <>
                                        <Option value="en">En</Option>
                                        <Option value="es">Es</Option>
                                        <Option value="fr">Fr</Option>
                                    </>
                                }
                            />



                            {
                                ArrayButtonOnHeader.map((item: ArrayButtonOnHeaderType) => {
                                    return (
                                        <>
                                            <Button type='default' size={width < 950 ? "small" : "middle"} >
                                                {item.icon}
                                                {width < 768 ? null : <span className='text-xs'>{item.title}</span>}
                                            </Button>
                                        </>
                                    )
                                })
                            }


                        </div>

                    </div>
                </Header>
                <Content
                    className='min-h-[280px] p-6! my-3.5! mx-4!'
                    style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
                <Footer className='text-center! h-5! text-xs!'>
                    Classroom Coach ©{new Date().getFullYear()} {t("mainlayout.create_messgae")}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;