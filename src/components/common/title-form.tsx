import { Button, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';


interface TitleFormProps {
    title: string
}

function TitleForm({ title }: TitleFormProps) {
    const navigate = useNavigate()
    return (
        <div
            className='flex justify-between gap-2.5 items-center px-0! py-2.5! border-b-2 border-solid border-[#e8e8e8] mb-5! '
        >
            <div className='flex flex-row gap-3.5'>
                <Button type='dashed' onClick={() => navigate(-1)}>
                    <LeftOutlined />
                </Button>
                <Typography.Title level={4} style={{ margin: 0 }}>
                    {title}
                </Typography.Title>
            </div>


        </div>
    )
}
export default TitleForm