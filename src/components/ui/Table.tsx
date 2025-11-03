import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef, TableProps } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
// import { useTheme } from './../../hooks/use-theme';


interface TableUIProps {
    searchText: string;
}

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
}

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[{ required: true, message: `${title} is required.` }]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingInlineEnd: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

interface DataType {
    key: React.Key;
    action?: string;
    no: string | number;
    organizationEntity: string;
    sites: string;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

const App: React.FC<TableUIProps> = ({ searchText }) => {
    const [loading, setLoading] = useState(true);
    // const { isDark } = useTheme();
    const isDark = localStorage.getItem('theme')

    useEffect(() => {
        (() => {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        })()
    }, []);
    const [dataSource, setDataSource] = useState<DataType[]>([
        {
            key: '1',
            action: '',
            no: 1,
            organizationEntity: 'HighScope Academy',
            sites: 'Cyprus Campus',
            role: 'Administrator',
            firstName: 'Amir',
            lastName: 'Hatami',
            email: 'amir.hatami@example.com',
        },
        {
            key: '2',
            action: '',
            no: 2,
            organizationEntity: 'Global Learning Center Global Learning Center Global Learning CenterGlobal Learning Center',
            sites: 'New York',
            role: 'Teacher',
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@example.com',
        },
        {
            key: '3',
            action: '',
            no: 3,
            organizationEntity: 'Future Mind Institute',
            sites: 'Dubai Branch',
            role: 'Student',
            firstName: 'Ali',
            lastName: 'Rezaei',
            email: 'ali.rezaei@example.com',
        },
        {
            key: '4',
            action: '',
            no: 4,
            organizationEntity: 'Techno Kids',
            sites: 'Istanbul Center',
            role: 'Guest',
            firstName: 'Mehmet',
            lastName: 'Demir',
            email: 'mehmet.demir@example.com',
        },
        {
            key: '5',
            action: '',
            no: 5,
            organizationEntity: 'Techno Kids',
            sites: 'Istanbul Center',
            role: 'Guest',
            firstName: 'Mehmet',
            lastName: 'Demir',
            email: 'mehmet.demir@example.com',
        },
        {
            key: '6',
            action: '',
            no: 6,
            organizationEntity: 'Techno Kids',
            sites: 'Istanbul Center',
            role: 'Guest',
            firstName: 'Mehmet',
            lastName: 'Demir',
            email: 'mehmet.demir@example.com',
        },
        {
            key: '7',
            action: '',
            no: 7,
            organizationEntity: 'Techno Kids',
            sites: 'Istanbul Center',
            role: 'Guest',
            firstName: 'Mehmet',
            lastName: 'Demir',
            email: 'mehmet.demir@example.com',
        },
        {
            key: '8',
            action: '',
            no: 8,
            organizationEntity: 'Techno Kids',
            sites: 'Istanbul Center',
            role: 'Guest',
            firstName: 'Mehmet',
            lastName: 'Demir',
            email: 'mehmet.demir@example.com',
        },
        {
            key: '9',
            action: '',
            no: 9,
            organizationEntity: 'Techno Kids',
            sites: 'Istanbul Center',
            role: 'Guest',
            firstName: 'Mehmet',
            lastName: 'Demir',
            email: 'mehmet.demir@example.com',
        },
        {
            key: '10',
            action: '',
            no: 10,
            organizationEntity: 'Techno Kids',
            sites: 'Istanbul Center',
            role: 'Guest',
            firstName: 'Mehmet',
            lastName: 'Demir',
            email: 'mehmet.demir@example.com',
        },
        {
            key: '11',
            action: '',
            no: 11,
            organizationEntity: 'Techno Kids',
            sites: 'Istanbul Center',
            role: 'Guest',
            firstName: 'Mehmet',
            lastName: 'Demir',
            email: 'mehmet.demir@example.com',
        },
        {
            key: '12',
            action: '',
            no: 12,
            organizationEntity: 'Techno Kids',
            sites: 'Istanbul Center',
            role: 'Guest',
            firstName: 'Mehmet',
            lastName: 'Demir',
            email: 'mehmet.demir@example.com',
        },
        {
            key: '13',
            action: '',
            no: 13,
            organizationEntity: 'Techno Kids',
            sites: 'Istanbul Center',
            role: 'Guest',
            firstName: 'Mehmet',
            lastName: 'Demir',
            email: 'mehmet.demir@example.com',
        },
        {
            key: '14',
            action: '',
            no: 14,
            organizationEntity: 'Techno Kids',
            sites: 'Istanbul Center',
            role: 'Guest',
            firstName: 'Mehmet',
            lastName: 'Demir',
            email: 'mehmet.demir@example.com',
        },
        {
            key: '15',
            action: '',
            no: 15,
            organizationEntity: 'Techno Kids',
            sites: 'Istanbul Center',
            role: 'Guest',
            firstName: 'Mehmet',
            lastName: 'Demir',
            email: 'mehmet.demir@example.com',
        },
    ]);

    // const [count, setCount] = useState(2);

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            // title: 'Action',
            // dataIndex: 'action',
            // render: (_, record) =>
            //     dataSource.length >= 1 ? (
            //         <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            //             <a>Delete</a>
            //         </Popconfirm>
            //     ) : null,

            title: 'Action',
            dataIndex: 'action',
            align:'center',
            render: (_, record) => (
                <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <DeleteOutlined />
                    </Popconfirm>

                    <Popconfirm title="Sure to edit?" onConfirm={() => handleDelete(record.key)}>
                        <EditOutlined />
                    </Popconfirm>
                </div>
            ),
        },
        {
            title: 'No',
            dataIndex: 'no',
            // width: '30%',
            // editable: false,
        },
        {
            title: 'Organization Entity',
            dataIndex: 'organizationEntity',
            width: '20%',
            ellipsis: true,
        },
        {
            title: 'Sites',
            dataIndex: 'sites',
            showSorterTooltip: true,
            sorter: (a, b) => a.sites.localeCompare(b.sites),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            filters: [
                { text: 'Administrator', value: 'Administrator' },
                { text: 'Teacher', value: 'Teacher' },
                { text: 'Student', value: 'Student' },
                { text: 'Guest', value: 'Guest' },
            ],
            onFilter: (value, record) => record.role.includes(value as string),
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Search First Name`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm({ closeDropdown: true })}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Button type="primary" onClick={() => confirm({ closeDropdown: true })} size="small" style={{ width: 90 }}>
                        Search
                    </Button>
                    <Button onClick={() => clearFilters?.()} size="small" style={{ width: 90, marginLeft: 8 }}>
                        Reset
                    </Button>
                </div>
            ),
            filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) =>
                record.firstName.toString().toLowerCase().includes((value as string).toLowerCase()),
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            responsive: ['md'],
            width: '20%',
        },
    ];

    const handleSave = (row: DataType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const filteredData = dataSource.filter(item =>
        Object.values(item).some(
            value =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchText.toLowerCase())
        )
    );

    // useEffect(() => {
    //     console.log('isDark', isDark)
    // }, [isDark])

    return (
        <div>

            <Table<DataType>
                // className='bg-gr'
                // loading={{
                //     spinning: loading,
                //     indicator: <LoadingOutlined style={{ fontSize: 48 }} spin />
                // }}
                loading={loading}
                components={components}
                // rowClassName={() => 'editable-row'}
                bordered
                dataSource={filteredData}
                columns={columns as ColumnTypes}
                size='middle'
                scroll={{ x: 1200 }}
                rowClassName={(_, index) =>
                    index % 2 === 0 ? `${isDark === 'dark' ? 'bg-[#171B19]' : 'bg-white'}` : `${isDark === 'dark' ? 'bg-gray-950' : 'bg-gray-100'}`
                }
            />
        </div>
    );
};

export default App;