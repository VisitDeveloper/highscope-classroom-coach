import { theme, Typography } from 'antd'
// import { useTheme } from './../hooks/use-theme'

function Reports() {
    // const { isDark } = useTheme();
    const {
        token: { colorBgBase },
    } = theme.useToken();
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col lg:flex-row justify-center items-center gap-4 w-full'>
                <div className={`w-[90%] lg:w-[40%] h-[220px] rounded-lg shadow-xl  flex flex-row`} style={{ backgroundColor: colorBgBase }}>

                    <div className='w-[40%] h-full bg-no-repeat bg-center bg-cover rounded-tl-lg rounded-bl-lg'
                        style={{ backgroundImage: `url('/images/2.jpg')`, }}>
                    </div>
                    <Typography.Title level={3} className='ml-4! mt-2!'>
                        Classroom Report
                    </Typography.Title>

                </div>

                <div className={`w-[90%] lg:w-[40%] h-[220px] rounded-lg shadow-xl  flex flex-row`} style={{ backgroundColor: colorBgBase }}>

                    <div className='w-[40%] h-full bg-no-repeat bg-center bg-cover rounded-tl-lg rounded-bl-lg'
                        style={{ backgroundImage: `url('/images/2.jpg')`, }}>
                    </div>
                    <Typography.Title level={3} className='ml-4! mt-2!'>
                        Export data to CSV file
                    </Typography.Title>

                </div>
            </div>

            <div className='flex flex-col lg:flex-row justify-center items-center gap-4 w-full'>
                <div className={`w-[90%] lg:w-[40%] h-[220px] rounded-lg shadow-xl  flex flex-row`} style={{ backgroundColor: colorBgBase }}>

                    <div className='w-[40%] h-full bg-no-repeat bg-center bg-cover rounded-tl-lg rounded-bl-lg'
                        style={{ backgroundImage: `url('/images/2.jpg')`, }}>
                    </div>
                    <Typography.Title level={3} className='ml-4! mt-2!'>
                        Planing Report
                    </Typography.Title>

                </div>
                <div className={`w-[90%] lg:w-[40%] h-[220px] rounded-lg shadow-xl  flex flex-row`} style={{ backgroundColor: colorBgBase }}>

                    <div className='w-[40%] h-full bg-no-repeat bg-center bg-cover rounded-tl-lg rounded-bl-lg'
                        style={{ backgroundImage: `url('/images/2.jpg')`, }}>
                    </div>
                    <Typography.Title level={3} className='ml-4! mt-2!'>
                        Completion Report
                    </Typography.Title>

                </div>
            </div>
        </div>
    )
}
export default Reports