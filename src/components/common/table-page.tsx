import { useState } from 'react';
import ReusableTable from './../ui/reusable-table';
import { Button, Input } from 'antd';
import TitlePage from './title-page';
import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { useWindowSize } from './../../hooks/use-size';
// import ModalCommon from './../ui/modal';
import { useNavigate } from 'react-router';
import type { JSX } from 'react';

interface GenericTableProps<T> {
    title: string;
    initialData: T[];
    columns: any[];
    createButtonPath?: string; // مسیر برای دکمه Create
    customActions?: (record: T) => JSX.Element; // دکمه یا اکشن سفارشی برای هر ردیف
    exportFields?: string[];

    isOpenModal?: boolean;
    setIsOpenModal?: any
}

const GenericTable = <T extends { key: string }>({
    title,
    initialData,
    columns,
    createButtonPath,
    customActions,
    exportFields = [],
}: GenericTableProps<T>) => {
    const [searchText, setSearchText] = useState('');
    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
    const { width } = useWindowSize();
    const inputWidth = width < 768 ? 150 : 200;
    const [pagination, setPagination] = useState({ pageSize: 5 });
    const [data, setData] = useState<T[]>(initialData);
    const navigate = useNavigate();

    const handleDelete = (key: React.Key) => {
        setData(prev => prev.filter(item => item.key !== key));
        console.log('Deleted key:', key);
    };

    // اگر اکشن سفارشی وجود دارد، آن را به ستون‌ها اضافه کن
    const finalColumns = customActions
        ? [
            ...columns,
            {
                title: 'Actions',
                key: 'custom',
                render: (_: any, record: T) => customActions(record),
            },
        ]
        : columns;

    return (
        <div>
            <TitlePage
                title={title}
                elements={
                    <>
                        {createButtonPath && (
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => navigate(createButtonPath)}
                            >
                                <PlusOutlined />
                            </Button>
                        )}

                        <Button
                            type="default"
                            size="large"
                            onClick={() => setIsOpenFilter(!isOpenFilter)}
                        >
                            <FilterOutlined />
                        </Button>

                        <div
                            className="flex items-center overflow-hidden"
                            style={{
                                width: isOpenFilter ? inputWidth : 0,
                                transition: 'width 0.3s ease, opacity 0.3s ease',
                                opacity: isOpenFilter ? 1 : 0,
                            }}
                        >
                            <Input.Search
                                placeholder="Search..."
                                size="large"
                                className={`w-full m-0 ${isOpenFilter ? 'cursor-auto' : 'cursor-no-none'
                                    }`}
                                onChange={e => setSearchText(e.target.value)}
                            />
                        </div>
                    </>
                }
            />

            <ReusableTable<T>
                columns={finalColumns}
                dataSource={data}
                searchText={searchText}
                inlineEdit={true}
                withActions={true}
                selectable={true}
                globalSearch={true}
                pagination={{
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ['4', '10', '15', '20', '25', '30', '50', '100'],
                    onChange: (_, pageSize) => setPagination({ pageSize }),
                }}
                scroll={{ x: 1200 }}
                exportOptions={{
                    enableCsv: true,
                    enableXlsx: true,
                    fileName: title.replace(/\s/g, '_').toLowerCase(),
                    fieldsToExport: exportFields as any,
                }}
                onDelete={handleDelete}
            />
            {/* 
            <ModalCommon isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
   // محتوا
            </ModalCommon> */}
        </div>
    );
};

export default GenericTable;
