import { Typography } from 'antd'



interface TitlePageProps {
    title: string;
    elements?: React.ReactElement | React.ReactNode;
}

function TitlePage(props: TitlePageProps) {

    return (
        <>
            <div className='flex flex-row max-[842px]:flex-col justify-between gap-2.5 items-center px-0! py-2.5! border-b-2 border-solid border-[#e8e8e8] mb-5! ' >
                <Typography.Title level={4} style={{ margin: 0 }}>
                    {props.title}
                </Typography.Title>

                <div className='flex flex-row-reverse gap-2.5 items-center'>
                    {props.elements}
                </div>
            </div>
        </>
    )
}
export default TitlePage