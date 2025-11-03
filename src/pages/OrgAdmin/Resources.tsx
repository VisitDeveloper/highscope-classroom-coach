import { theme, Typography } from 'antd';
import Link from 'antd/es/typography/Link';

export default function Resources() {
    const {
        token: { colorPrimary },
    } = theme.useToken();
    return (
        <div>
            <div className='flex flex-row justify-center items-center h-[60px] w-full rounded-lg' style={{ backgroundColor: colorPrimary }}>
                <Typography.Title level={5} style={{ color: '#fff' }}>
                    Resources
                </Typography.Title>
            </div>

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
