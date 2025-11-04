import { theme, Typography } from 'antd'
// import { useTheme } from './../hooks/use-theme'

function Reports() {
    // const { isDark } = useTheme();
    const {
        token: { colorBgBase },
    } = theme.useToken();
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col lg:flex-row justify-center items-center gap-10 w-full'>
                <div className={`w-[90%] lg:w-[40%] h-[220px] rounded-lg shadow-xl  flex flex-row`} style={{ backgroundColor: colorBgBase }}>

                    <div className='w-[40%] h-full bg-no-repeat bg-center bg-cover rounded-tl-lg rounded-bl-lg'
                        style={{ backgroundImage: `url('/images/cc.jpg')`, }}>
                    </div>
                    <div className='flex flex-col w-[60%]'>

                        <Typography.Title level={4} className='ml-4! mt-2!'>
                            Classroom Report
                        </Typography.Title>

                        <Typography.Paragraph className='ml-4! mt-2! pr-5! text-justify'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, unde sapiente consequatur iusto magni sed atque ea ex similique reprehenderit cupiditate illum odit nihil nostrum ad id eum quo ipsa?
                        </Typography.Paragraph>
                    </div>

                </div>

                <div className={`w-[90%] lg:w-[40%] h-[220px] rounded-lg shadow-xl  flex flex-row`} style={{ backgroundColor: colorBgBase }}>

                    <div className='w-[40%] h-full bg-no-repeat bg-center bg-cover rounded-tl-lg rounded-bl-lg'
                        style={{ backgroundImage: `url('/images/ec.jpg')`, }}>
                    </div>
                    <div className='flex flex-col w-[60%]'>
                        <Typography.Title level={4} className='ml-4! mt-2!'>
                            Export data to CSV file
                        </Typography.Title>

                        <Typography.Paragraph className='ml-4! mt-2! pr-5! text-justify'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, unde sapiente consequatur iusto magni sed atque ea ex similique reprehenderit cupiditate illum odit nihil nostrum ad id eum quo ipsa?
                        </Typography.Paragraph>
                    </div>

                </div>
            </div>

            <div className='flex flex-col lg:flex-row justify-center items-center gap-10 w-full mt-8!'>
                <div className={`w-[90%] lg:w-[40%] h-[220px] rounded-lg shadow-xl  flex flex-row`} style={{ backgroundColor: colorBgBase }}>

                    <div className='w-[40%] h-full bg-no-repeat bg-center bg-cover rounded-tl-lg rounded-bl-lg'
                        style={{ backgroundImage: `url('/images/pr.jpg')`, }}>
                    </div>
                    <div className='flex flex-col w-[60%]'>
                        <Typography.Title level={4} className='ml-4! mt-2!'>
                            Planing Report
                        </Typography.Title>

                        <Typography.Paragraph className='ml-4! mt-2! pr-5! text-justify'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, unde sapiente consequatur iusto magni sed atque ea ex similique reprehenderit cupiditate illum odit nihil nostrum ad id eum quo ipsa?
                        </Typography.Paragraph>
                    </div>

                </div>
                <div className={`w-[90%] lg:w-[40%] h-[220px] rounded-lg shadow-xl  flex flex-row`} style={{ backgroundColor: colorBgBase }}>

                    <div className='w-[40%] h-full bg-no-repeat bg-center bg-cover rounded-tl-lg rounded-bl-lg'
                        style={{ backgroundImage: `url('/images/cr.jpg')`, }}>
                    </div>
                    <div className='flex flex-col w-[60%]'>
                        <Typography.Title level={4} className='ml-4! mt-2!'>
                            Completion Report
                        </Typography.Title>
                        <Typography.Paragraph className='ml-4! mt-2! pr-5! text-justify'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, unde sapiente consequatur iusto magni sed atque ea ex similique reprehenderit cupiditate illum odit nihil nostrum ad id eum quo ipsa?
                        </Typography.Paragraph>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Reports