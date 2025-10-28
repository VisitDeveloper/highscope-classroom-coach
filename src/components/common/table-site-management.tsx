import { useState } from 'react';
import ReusableTable from './../ui/reusable-table';
import { Button, Input, theme } from 'antd';
import TitlePage from './title-page';
import {
    FilterOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useWindowSize } from './../../hooks/use-size';
import ModalCommon from '../ui/modal';
// import CreateClassRoomForm from './../../pages/CreateClassRoom';
import { useNavigate } from 'react-router';
// import type { ColumnsType } from 'antd/es/table';
import ModalCreateClassRoomForm from './../../pages/ModalCreateClassRoom';


interface Site {
    key: string;
    entityName: string;
    siteId: string;
    siteName: string;
    timezone: string;
    operation: string;
}

// const headerStyle: React.CSSProperties = {
//     backgroundColor: '#001529',
//     color: 'white',
//     fontWeight: 600,
//     textAlign: 'center',
// };

const UsersTable = () => {
    const {
        token: { colorPrimary },
    } = theme.useToken();
    const [searchText, setSearchText] = useState('');
    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
    const [openModalCreateClassRoom, setOpenModalCreateClassRoom] = useState<boolean>(false);
    const { width } = useWindowSize();
    const inputWidth = width < 768 ? 150 : 200;
    const [pagination, setPagination] = useState({ pageSize: 5 });
    const navigate = useNavigate();

    const [users, setUsers] = useState<Site[]>([
        {
            key: '1',
            entityName: 'Global Corp',
            siteId: 'GC001',
            siteName: 'New York Office',
            timezone: 'EST',
            operation: '9:00 AM - 5:00 PM',
        },
        {
            key: '2',
            entityName: 'Global Corp',
            siteId: 'GC002',
            siteName: 'London Office',
            timezone: 'GMT',
            operation: '8:00 AM - 4:00 PM',
        },
        {
            key: '3',
            entityName: 'Tech Solutions',
            siteId: 'TS101',
            siteName: 'San Francisco Office',
            timezone: 'PST',
            operation: '10:00 AM - 6:00 PM',
        },
        {
            key: '4',
            entityName: 'Tech Solutions',
            siteId: 'TS102',
            siteName: 'Berlin Office',
            timezone: 'CET',
            operation: '9:00 AM - 5:00 PM',
        },
        {
            key: '5',
            entityName: 'Innovate Ltd',
            siteId: 'IN500',
            siteName: 'Tokyo Office',
            timezone: 'JST',
            operation: '9:30 AM - 6:30 PM',
        },
    ]);

    const columns = [
        {
            title: 'Entity Name',
            dataIndex: 'entityName',
        },
        {
            title: 'Site ID',
            dataIndex: 'siteId',
        },
        {
            title: 'Site Name',
            dataIndex: 'siteName',
        },
        {
            title: 'Timezone',
            dataIndex: 'timezone',
        },
        {
            title: 'Hours Of Operation',
            dataIndex: 'operation',
        },
        {
            title: 'Classroms',
            key: 'action',
            render: (_: any, record: Site) => (
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => {
                        console.log('Custom button clicked for', record.siteName);
                        // navigate(`/create-classroom`);
                        setOpenModalCreateClassRoom(true)
                    }}
                >
                    Add Classroom
                </Button>
            ),
        },
    ];

    // const columnsAddStyle = columns.map(col => ({
    //     ...col,
    //     onHeaderCell: () => ({
    //         style: headerStyle,
    //     }),
    // })) as ColumnsType<Site>;



    const handleDelete = (key: React.Key) => {
        setUsers(prev => prev.filter(user => user.key !== key));
        console.log('Deleted key:', key);
    };

    return (
        <div>
            <TitlePage
                title="Manage Site"
                elements={<>
                    <Button type='primary' size='large' onClick={() => {
                        // setOpenModalCreateClassRoom(true)
                        navigate('/create-site')
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
            />

            <ReusableTable<Site>
                columns={columns}
                dataSource={users}
                searchText={searchText}
                inlineEdit={true}
                withActions={true}
                selectable={true}
                globalSearch={true}
                pagination={{
                    style: {
                        marginRight: '15px'
                    },
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ['4', '10', '15', '20', '25', '30', '50', '100'],
                    onChange: (_, pageSize) => setPagination({ pageSize: pageSize })
                }}
                style={{
                    border: `1px solid ${colorPrimary}`,
                    borderRadius: '8px',
                    padding: '10px 0px',

                }}
                className='shadow-lg'
                scroll={{ x: 1200 }}
                exportOptions={{
                    enableCsv: true,
                    enableXlsx: true,
                    fileName: 'site_management',
                    fieldsToExport: ['entityName', 'siteId', 'siteName'],
                }}
                onDelete={handleDelete}
                onEdit={() => navigate('/resources')}
            />

            {openModalCreateClassRoom ?
                (<>
                    <ModalCommon
                        titleModal={"Create Classroom"}
                        openModal={openModalCreateClassRoom}
                        onClose={() => setOpenModalCreateClassRoom(false)}
                    >
                        <ModalCreateClassRoomForm />
                    </ModalCommon>
                </>) : null

            }
        </div>
    );
};

export default UsersTable;
