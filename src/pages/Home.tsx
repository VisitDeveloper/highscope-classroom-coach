import { Button, Input, Modal, theme, Typography } from 'antd'
import { useState } from 'react'
import Table from './../components/ui/Table';
import {
    FilterOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useWindowSize } from '../hooks/use-size';
import { useNavigate } from 'react-router';
import CreateClassRoomForm from './CreateClassRoom';
import TitlePage from './../components/common/title-page';
import ModalCommon from '../components/ui/modal';
import UsersTable from './../components/common/table-site-management';

function Home() {
    // const { token: { colorBorder, colorText } } = theme.useToken();
    // const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
    // const [searchText, setSearchText] = useState<string>('');
    // const [openModalCreateClassRoom, setOpenModalCreateClassRoom] = useState<boolean>(false)
    // const navigate = useNavigate();

    // const { width } = useWindowSize();
    // const inputWidth = width < 768 ? 150 : 200;

    return (
        <div>

            {/* <TitlePage
                title="Manage Classrooms"
                elements={<>
                    <Button type='primary' size='large' onClick={() => {
                        // navigate('/create-classroom')
                        setOpenModalCreateClassRoom(true)
                    }}>
                        <PlusOutlined />
                    </Button>

                    <Button type='default' size='large'
                        onClick={() => setIsOpenFilter(!isOpenFilter)}

                    >
                        <FilterOutlined />
                    </Button>

                    <div
                        className='flex items-center overflow-hidden '
                        style={{
                            width: isOpenFilter ? inputWidth : 0,
                            transition: 'width 0.3s ease, opacity 0.3s ease',
                            opacity: isOpenFilter ? 1 : 0,
                        }}
                    >
                        <Input.Search
                            placeholder="Search..."
                            size='large'
                            className={`w-full m-0 ${isOpenFilter ? 'cursor-auto' : 'cursor-no-none'}`}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </>}
            /> */}


            {/* <div> */}
            {/* <Table searchText={searchText} /> */}
            {/* <UsersTable/> */}
            {/* </div> */}
            <>

                {/* {openModalCreateClassRoom ?
                    (<>
                        <ModalCommon
                            titleModal={"Create Classroom"}
                            openModal={openModalCreateClassRoom}
                            onClose={() => setOpenModalCreateClassRoom(false)}
                        >
                            <CreateClassRoomForm />
                        </ModalCommon>
                    </>) : null

                } */}

            </>

            <UsersTable />
        </div>
    )
}
export default Home