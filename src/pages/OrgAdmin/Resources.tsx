import { Button, Col, Row, theme, Typography } from 'antd';
import Link from 'antd/es/typography/Link';
import {
    CalendarOutlined,
    CloudServerOutlined,
    FilePdfOutlined,
} from '@ant-design/icons';

export default function Resources() {
    const {
        token: { colorPrimary, colorBorder },
    } = theme.useToken();
    return (
        <div>
            <div className='flex flex-row justify-center items-center h-[60px] w-full rounded-lg' style={{ backgroundColor: colorPrimary }}>
                <Typography.Title level={5} style={{ color: '#fff' }}>
                    Resources
                </Typography.Title>
            </div>

            <Row gutter={[16, 16]} className='mt-4!'>
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <div className='rounded-sm shadow-lg bg-[#e8e8e8] flex flex-col'>
                        <div className='flex flex-row justify-start items-center gap-1.5 px-4! py-3!'>
                            <FilePdfOutlined style={{ fontSize: 55, color: 'red' }} />

                            <Typography.Text style={{ fontWeight: 500 }}>
                                file_name_test.pdf
                            </Typography.Text>
                        </div>
                        <div className='flex flex-col gap-2.5 h-[170px]  justify-start items-start bg-[#F6F6F6] px-4! py-3! rounded-sm'>
                            <div className='flex flex-row gap-4 mt-5!'>
                                <CloudServerOutlined style={{ fontSize: 20, color: colorBorder }} />
                                <span className='font-medium text-1xl ' style={{ color: colorBorder }}>
                                    12.5 KB
                                </span>
                            </div>

                            <div className='flex flex-row gap-4'>
                                <CalendarOutlined style={{ fontSize: 20, color: colorBorder }} />
                                <span className='font-medium text-1xl' style={{ color: colorBorder }}>
                                    Sep 5, 2019, 12:27 PM
                                </span>
                            </div>

                            <div className='flex justify-center items-center w-full mt-7!'>
                                <Button type='default' style={{ color: colorPrimary, borderColor: colorPrimary }}>
                                    Download
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <div className='rounded-sm shadow-lg bg-[#e8e8e8] flex flex-col'>
                        <div className='flex flex-row justify-start items-center gap-1.5 px-4! py-3!'>
                            <FilePdfOutlined style={{ fontSize: 55, color: 'red' }} />

                            <Typography.Text style={{ fontWeight: 500 }}>
                                file_name_test.pdf
                            </Typography.Text>
                        </div>
                        <div className='flex flex-col gap-2.5 h-[170px]  justify-start items-start bg-[#F6F6F6] px-4! py-3! rounded-sm'>
                            <div className='flex flex-row gap-4 mt-5!'>
                                <CloudServerOutlined style={{ fontSize: 20, color: colorBorder }} />
                                <span className='font-medium text-1xl ' style={{ color: colorBorder }}>
                                    12.5 KB
                                </span>
                            </div>

                            <div className='flex flex-row gap-4'>
                                <CalendarOutlined style={{ fontSize: 20, color: colorBorder }} />
                                <span className='font-medium text-1xl' style={{ color: colorBorder }}>
                                    Sep 5, 2019, 12:27 PM
                                </span>
                            </div>

                            <div className='flex justify-center items-center w-full mt-7!'>
                                <Button type='default' style={{ color: colorPrimary, borderColor: colorPrimary }}>
                                    Download
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <div className='rounded-sm shadow-lg bg-[#e8e8e8] flex flex-col'>
                        <div className='flex flex-row justify-start items-center gap-1.5 px-4! py-3!'>
                            <FilePdfOutlined style={{ fontSize: 55, color: 'red' }} />

                            <Typography.Text style={{ fontWeight: 500 }}>
                                file_name_test.pdf
                            </Typography.Text>
                        </div>
                        <div className='flex flex-col gap-2.5 h-[170px]  justify-start items-start bg-[#F6F6F6] px-4! py-3! rounded-sm'>
                            <div className='flex flex-row gap-4 mt-5!'>
                                <CloudServerOutlined style={{ fontSize: 20, color: colorBorder }} />
                                <span className='font-medium text-1xl ' style={{ color: colorBorder }}>
                                    12.5 KB
                                </span>
                            </div>

                            <div className='flex flex-row gap-4'>
                                <CalendarOutlined style={{ fontSize: 20, color: colorBorder }} />
                                <span className='font-medium text-1xl' style={{ color: colorBorder }}>
                                    Sep 5, 2019, 12:27 PM
                                </span>
                            </div>

                            <div className='flex justify-center items-center w-full mt-7!'>
                                <Button type='default' style={{ color: colorPrimary, borderColor: colorPrimary }}>
                                    Download
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                    <div className='rounded-sm shadow-lg bg-[#e8e8e8] flex flex-col'>
                        <div className='flex flex-row justify-start items-center gap-1.5 px-4! py-3!'>
                            <FilePdfOutlined style={{ fontSize: 55, color: 'red' }} />

                            <Typography.Text style={{ fontWeight: 500 }}>
                                file_name_test.pdf
                            </Typography.Text>
                        </div>
                        <div className='flex flex-col gap-2.5 h-[170px]  justify-start items-start bg-[#F6F6F6] px-4! py-3! rounded-sm'>
                            <div className='flex flex-row gap-4 mt-5!'>
                                <CloudServerOutlined style={{ fontSize: 20, color: colorBorder }} />
                                <span className='font-medium text-1xl ' style={{ color: colorBorder }}>
                                    12.5 KB
                                </span>
                            </div>

                            <div className='flex flex-row gap-4'>
                                <CalendarOutlined style={{ fontSize: 20, color: colorBorder }} />
                                <span className='font-medium text-1xl' style={{ color: colorBorder }}>
                                    Sep 5, 2019, 12:27 PM
                                </span>
                            </div>

                            <div className='flex justify-center items-center w-full mt-7!'>
                                <Button type='default' style={{ color: colorPrimary, borderColor: colorPrimary }}>
                                    Download
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <div className='flex flex-col gap-6 justify-items-start items-start mt-3!'>
                <Link href="https://ant.design" target="_blank" className='text-2xl!' style={{ textDecoration: 'underline' }}>
                    Classroom Coach and ECERS-3 Crosswalk
                </Link>
                <Link href="https://ant.design" target="_blank" className='text-2xl!' style={{ textDecoration: 'underline' }}>
                    Classroom Coach and PQA Crosswalk
                </Link>
                <Link href="https://ant.design" target="_blank" className='text-2xl!' style={{ textDecoration: 'underline' }}>
                    Classroom Coach Classroom Materials Checklist
                </Link>

                <Link href="https://ant.design" target="_blank" className='text-2xl!' style={{ textDecoration: 'underline' }}>
                    Classroom Coach FAQ
                </Link>

                <Link href="https://ant.design" target="_blank" className='text-2xl!' style={{ textDecoration: 'underline' }}>
                    Classroom Coach Glossary
                </Link>

                <Link href="https://ant.design" target="_blank" className='text-2xl!' style={{ textDecoration: 'underline' }}>
                    Classroom Coach Measurement Tool
                </Link>

                <Link href="https://ant.design" target="_blank" className='text-2xl!' style={{ textDecoration: 'underline' }}>
                    Classroom Coach Research Base
                </Link>

                <Link href="https://ant.design" target="_blank" className='text-2xl!' style={{ textDecoration: 'underline' }}>
                    Classroom Coach Research Base
                </Link>

                <Link href="https://ant.design" target="_blank" className='text-2xl!' style={{ textDecoration: 'underline' }}>
                    Classroom Coach Scoring Guide
                </Link>

                <Link href="https://ant.design" target="_blank" className='text-2xl!' style={{ textDecoration: 'underline' }}>
                    Classroom Coach Scoring Summary
                </Link>

                <Link href="https://ant.design" target="_blank" className='text-2xl!' style={{ textDecoration: 'underline' }}>
                    Classroom Coach Strategy Report Instructions
                </Link>

                <Link href="https://ant.design" target="_blank" className='text-2xl!' style={{ textDecoration: 'underline' }}>
                    Classroom Coach Technical Report
                </Link>

            </div>
        </div>
    )
}
