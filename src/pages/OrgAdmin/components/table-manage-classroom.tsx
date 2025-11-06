import { useEffect, useState } from 'react';
import ReusableTable from './../../../components/ui/reusable-table';
import { Button, Input, theme } from 'antd';
import TitlePage from './../../../components/common/title-page';
import {
    FilterOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useWindowSize } from './../../../hooks/use-size';
import ModalCommon from './../../../components/ui/modal';
import { useNavigate } from 'react-router';
import ModalCreateClassRoomForm from './../Modal/ModalCreateClassRoom';
import { APP_ROUTES } from './../../../routes/routes';
import type { ColumnsType } from 'antd/es/table';
import { ManageSiteService } from './../../../services/manage-sites';


interface Site {
    key: number | string,
    organizationName?: string;
    siteName?: string;
    classroomName?: string;
    classroomTeacher?: string;
    status: any;
}


const PostServices = new ManageSiteService()

const ManageClassroomTable = () => {
    const {
        token: { colorText },
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
            organizationName: 'Greenwood Academy',
            siteName: 'North Campus',
            classroomName: 'Room A1',
            classroomTeacher: 'Mrs. Johnson',
            status: 'Active',
        },
        {
            key: '2',
            organizationName: 'Greenwood Academy',
            siteName: 'South Campus',
            classroomName: 'Room B2',
            classroomTeacher: 'Mr. Smith',
            status: 'Inactive',
        },
        {
            key: '3',
            organizationName: 'Sunrise School',
            siteName: 'Main Building',
            classroomName: 'Room 101',
            classroomTeacher: 'Ms. Williams',
            status: 'Active',
        },
        {
            key: '4',
            organizationName: 'Sunrise School',
            siteName: 'Annex Building',
            classroomName: 'Room 102',
            classroomTeacher: 'Mr. Davis',
            status: 'Under Maintenance',
        },
        {
            key: '5',
            organizationName: 'Horizons Institute',
            siteName: 'West Wing',
            classroomName: 'Room C3',
            classroomTeacher: 'Mrs. Miller',
            status: 'Active',
        },
        {
            key: '6',
            organizationName: 'Horizons Institute',
            siteName: 'East Wing',
            classroomName: 'Room D4',
            classroomTeacher: 'Dr. Wilson',
            status: 'Inactive',
        },
        {
            key: '7',
            organizationName: 'Innovation High',
            siteName: 'Block A',
            classroomName: 'Lab 1',
            classroomTeacher: 'Mr. Brown',
            status: 'Active',
        },
        {
            key: '8',
            organizationName: 'Innovation High',
            siteName: 'Block B',
            classroomName: 'Lab 2',
            classroomTeacher: 'Ms. Taylor',
            status: 'Inactive',
        },
        {
            key: '9',
            organizationName: 'Future Leaders School',
            siteName: 'Central Hall',
            classroomName: 'Room E5',
            classroomTeacher: 'Mrs. Anderson',
            status: 'Active',
        },
        {
            key: '10',
            organizationName: 'Future Leaders School',
            siteName: 'Science Block',
            classroomName: 'Room F6',
            classroomTeacher: 'Mr. Thomas',
            status: 'Under Review',
        },
    ]);

    const columns: ColumnsType<Site> = [
        {
            title: 'Organization Name',
            dataIndex: 'organizationName',
            align: 'center',
        },
        {
            title: 'Site Name',
            dataIndex: 'siteName',
            align: 'center',
        },
        {
            title: 'Classroom Name',
            dataIndex: 'classroomName',
            align: 'center',
        },
        {
            title: 'Classroom Teacher',
            dataIndex: 'classroomTeacher',
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center',
        },

    ];

    useEffect(() => {
        (async () => {
            try {
                const getLists = await PostServices.getList({})
                console.log('lsit', getLists.data)
            } catch (error) {
                console.log(error)
            }

        })()
    }, [])

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
                title="Manage ClassRoom"
                elements={<>
                    <Button type='primary' size='large' onClick={() => {
                        navigate(APP_ROUTES.ORG_ADMIN_CREATE_SITE)
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
                isActiveDelete={true}
                columns={columns}
                dataSource={users}
                searchText={searchText}
                inlineEdit={false}
                withActions={true}
                selectable={false}
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
                    border: `1px solid ${colorText}`,
                    borderRadius: '4px',
                    padding: '0px 0px 10px 0px',

                }}
                scroll={{ x: 1200 }}
                exportOptions={{
                    enableCsv: true,
                    enableXlsx: true,
                    fileName: 'site_management',
                    fieldsToExport: ['key', 'organizationName', 'siteName', 'classroomName', 'classroomTeacher', 'status'],
                }}
                onDelete={handleDelete}
                onEdit={() => navigate(APP_ROUTES.ORG_ADMIN_CREATE_SITE)}
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

export default ManageClassroomTable;
