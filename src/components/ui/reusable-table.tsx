import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { TableProps, TableColumnsType } from 'antd';
import { Table, Button, Space, Popconfirm, Tooltip, Form, Input } from 'antd';
import { DeleteOutlined, EditOutlined, DownloadOutlined } from '@ant-design/icons';
import type { InputRef, GetRef } from 'antd';
import * as XLSX from 'xlsx';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
    index?: number;
    children?: React.ReactNode;
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

interface EditableCellProps<RecordType> {
    title: React.ReactNode;
    editable?: boolean;
    dataIndex?: keyof RecordType;
    record?: RecordType;
    handleSave?: (record: RecordType) => void;
    children?: React.ReactNode;
}
function EditableCell<RecordType extends { key: React.Key }>({
    title,
    editable = false,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}: EditableCellProps<RecordType>) {
    const [editing, setEditing] = useState(false);
    const inputRef = React.useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus?.();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        if (form && dataIndex && record) {
            form.setFieldsValue({ [dataIndex as string]: (record as any)[dataIndex as any] });
        }
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave && handleSave({ ...(record as any), ...values });
        } catch (errInfo) {
            // ignore
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item style={{ margin: 0 }} name={dataIndex as string} rules={[{ required: true, message: `${title} is required.` }]}>
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div style={{ paddingInlineEnd: 24 }} onClick={toggleEdit} className="editable-cell-value-wrap">
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
}

/**
 * Props for ReusableTable
 */
export interface ReusableTableProps<RecordType> extends Omit<TableProps<RecordType>, 'columns' | 'dataSource'> {
    columns: TableColumnsType<RecordType>;
    dataSource: RecordType[];
    loading?: boolean;
    searchText?: string;
    withActions?: boolean; // if true, an actions column is injected (delete/edit)
    onEdit?: (row: RecordType) => void;
    onDelete?: (key: React.Key, row?: RecordType) => void;
    inlineEdit?: boolean; // enable inline edit
    exportOptions?: {
        enableCsv?: boolean;
        enableXlsx?: boolean;
        fileName?: string;
        fieldsToExport?: (keyof RecordType)[];
    };
    rowClassName?: (record: RecordType, index?: number) => string;
    selectable?: boolean; // show selection checkboxes
    pagination?: TableProps<RecordType>['pagination'];
    globalSearch?: boolean; // if true, apply searchText filter across all string fields

}

/**
 * Utility: download blob as file
 */
function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

/**
 * Convert array of objects to CSV string
 */
// function toCSV<T extends object>(data: T[], fields?: (keyof T)[]) {
//     if (!data || data.length === 0) return '';
//     const keys = fields && fields.length > 0 ? fields : (Object.keys(data[0]) as (keyof T)[]);
//     const header = keys.join(',');
//     const rows = data.map(row =>
//         keys
//             .map(k => {
//                 const v = (row as any)[k];
//                 if (v === null || v === undefined) return '';
//                 const s = String(v).replace(/"/g, '""');
//                 return `"${s}"`;
//             })
//             .join(',')
//     );
//     return [header, ...rows].join('\r\n');
// }

/**
 * ReusableTable component
 */
export function ReusableTable<RecordType extends { key: React.Key }>(props: ReusableTableProps<RecordType>) {
    const {
        columns,
        dataSource,
        loading = false,
        searchText = '',
        withActions = true,
        onEdit,
        onDelete,
        inlineEdit = true,
        exportOptions = { enableCsv: true, enableXlsx: true, fileName: 'export' },
        rowClassName,
        selectable = false,
        pagination = { pageSize: 10 },
        globalSearch = true,
        ...rest
    } = props;

    const [data, setData] = useState<RecordType[]>(dataSource);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        setData(dataSource);
    }, [dataSource]);

    const handleSave = useCallback(
        (row: RecordType) => {
            const newData = [...data];
            const index = newData.findIndex(item => item.key === row.key);
            if (index > -1) {
                newData.splice(index, 1, row);
                setData(newData);
            }
            onEdit && onEdit(row);
        },
        [data, onEdit]
    );

    const handleDelete = useCallback(
        (key: React.Key) => {
            onDelete ? onDelete(key) : setData(prev => prev.filter(p => p.key !== key));
            setSelectedRowKeys(prev => prev.filter(k => k !== key));
        },
        [onDelete]
    );

    // Inject action column if requested
    const actionColumn = useMemo(() => {
        if (!withActions) return [];
        return [
            // {
            //     title: 'Action',
            //     dataIndex: '__action',
            //     width: 100,
            //     fixed: undefined,
            //     render: (_: any, record: RecordType) => (
            //         <Space size="small">
            //             <Tooltip title="Edit">
            //                 <Button
            //                     type="text"
            //                     icon={<EditOutlined />}
            //                     onClick={() => {
            //                         if (inlineEdit) {
            //                             // attempt to trigger inline (no-op: inline handled by clicking cell)
            //                             // fallback to onEdit callback
            //                             onEdit && onEdit(record);
            //                         } else {
            //                             onEdit && onEdit(record);
            //                         }
            //                     }}
            //                 />
            //             </Tooltip>
            //             <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            //                 <Button type="text" icon={<DeleteOutlined />} />
            //             </Popconfirm>
            //         </Space>
            //     ),
            // } as any,
        ];
    }, [withActions, inlineEdit, handleDelete, onEdit]);

    // Compose columns with editable cell support
    const mergedColumns = useMemo(() => {
        const cols = [...columns];
        // ensure actions column at left-most if exists
        // اول اکشن هست بعد ستون های عدی 
        // const finalCols = withActions ? [...actionColumn, ...cols] : cols;
        // اول ستون های دیگه بعد اکشن 
        const finalCols = withActions ? [...cols, ...actionColumn] : cols;

        return finalCols.map(col => {
            const editable = (col as any).editable;
            if (!editable) return col;
            return {
                ...col,
                onCell: (record: RecordType) => ({
                    record,
                    editable: true,
                    dataIndex: (col as any).dataIndex,
                    title: col.title,
                    handleSave: (handleSave as any),
                }),
            };
        });
    }, [columns, withActions, actionColumn, handleSave]);

    const components = inlineEdit
        ? {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        }
        : undefined;

    // Filtering by searchText across string fields if enabled
    const filteredData = useMemo(() => {
        if (!searchText || !globalSearch) return data;
        const s = searchText.toString().toLowerCase();
        return data.filter(item =>
            Object.values(item).some(v => typeof v === 'string' && v.toLowerCase().includes(s))
        );
    }, [data, searchText, globalSearch]);

    // Export CSV
    // const exportCSV = useCallback(() => {
    //     const arr = filteredData.map(item => {
    //         // convert any nested objects to JSON
    //         const out: any = {};
    //         Object.entries(item as any).forEach(([k, v]) => {
    //             if (exportOptions.fieldsToExport && exportOptions.fieldsToExport.length > 0) {
    //                 if (!(exportOptions.fieldsToExport as string[]).includes(k)) return;
    //             }
    //             out[k] = v;
    //         });
    //         return out;
    //     });
    //     const csv = toCSV(arr, exportOptions.fieldsToExport as any);
    //     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    //     downloadBlob(blob, `${exportOptions.fileName || 'export'}.csv`);
    // }, [filteredData, exportOptions]);

    // Export XLSX
    const exportXlsx = useCallback(() => {
        const rows = filteredData.map(item => {
            const out: any = {};
            Object.entries(item as any).forEach(([k, v]) => {
                if (exportOptions.fieldsToExport && exportOptions.fieldsToExport.length > 0) {
                    if (!(exportOptions.fieldsToExport as string[]).includes(k)) return;
                }
                out[k] = v;
            });
            return out;
        });
        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        downloadBlob(blob, `${exportOptions.fileName || 'export'}.xlsx`);
    }, [filteredData, exportOptions]);

    // Toolbar (inside table)
    const toolbar = (
        <Space style={{ marginBottom: 12 }}>
            {exportOptions.enableCsv && (
                // <Button icon={<DownloadOutlined />} onClick={exportCSV}>
                //     Export CSV
                // </Button>
                null
            )}
            {exportOptions.enableXlsx && (
                <Button icon={<DownloadOutlined />} onClick={exportXlsx}>
                    Export Excel
                </Button>
            )}
            {selectable && selectedRowKeys.length > 0 && (
                <Popconfirm title="Delete selected?" onConfirm={() => selectedRowKeys.forEach(k => handleDelete(k))}>
                    <Button danger>Delete Selected ({selectedRowKeys.length})</Button>
                </Popconfirm>
            )}
        </Space>
    );

    const rowSelection = selectable
        ? {
            selectedRowKeys,
            onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
        }
        : undefined;


    const theme = localStorage.getItem('theme')
    const computedRowClassName = (record: RecordType, index?: number) => {
        if (rowClassName) return rowClassName(record, index);
        const dark = theme === 'dark';
        const even = (index ?? 0) % 2 === 0;
        return even ? (dark ? 'bg-[#171B19]' : 'bg-white') : dark ? 'bg-gray-950' : 'bg-gray-100';
    };


    return (
        <div>
            <div className='flex justify-between mb-2!'>
                <div>{toolbar}</div>
            </div>

            <Table
                {...(rest as TableProps<RecordType>)}
                components={components}
                rowClassName={computedRowClassName}
                loading={loading}
                dataSource={filteredData}
                columns={mergedColumns as any}
                pagination={pagination}
                rowSelection={rowSelection as any}
                size={(rest as any).size || 'middle'}
                scroll={(rest as any).scroll}
                className='custom-table-header'

            />
        </div>
    );
}

export default ReusableTable;
