import { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Space, theme } from "antd";
import TitlePage from "./../../../components/common/title-page";
import {    FilterOutlined } from "@ant-design/icons";
import { useWindowSize } from "./../../../hooks/use-size";
import ReusableTable from "./../../../components/ui/reusable-table";
import type { ColumnsType } from "antd/es/table";
import { TrashIcon } from "@phosphor-icons/react";

interface GenericTableProps<T extends { [key: string]: any }> {
    service: {
        getList: (params?: any) => Promise<{ data: T[]; total?: number }>,
        delete?: (id: any) => Promise<any>
    };
    title: string;
    keyColumn?: keyof T; // optional: key column for selection or deletion
    additionalColumns?: ColumnsType<T>; // برای ستون‌هایی که میخوای اضافه بشه مثل دکمه‌ها
    elementsTitle?: React.ReactElement | React.ReactNode;
    pageSizeOptions?: string[];
    initialPageSize?: number;
}

const GenericTable = <T extends {
    id: React.Key; key: React.Key
}>({
    service,
    title,
    keyColumn,
    additionalColumns,
    elementsTitle = <></>,
    pageSizeOptions = ["5", "10", "20", "50"],
    initialPageSize = 5,
    ...rest
}: GenericTableProps<T>) => {
    const { token } = theme.useToken();
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const { width } = useWindowSize();
    const inputWidth = width < 768 ? 150 : 200;
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(initialPageSize);
    const [total, setTotal] = useState<number>(0);
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    // generate columns dynamically from keys
    // const generateColumns = (items: T[]): ColumnsType<T> => {
    //     if (!items || items.length === 0) return [];

    //     const keys = Object.keys(items[0]) as (keyof T)[];
    //     const cols: ColumnsType<T> = keys.map((key) => ({
    //         title: String(key).replace(/([A-Z])/g, " $1"), // camelCase to spaced
    //         dataIndex: key as string,
    //         key: String(key),
    //         align: "center",
    //         sorter: (a, b) => {
    //             if (typeof a[key] === "number" && typeof b[key] === "number") {
    //                 return (a[key] as number) - (b[key] as number);
    //             }
    //             return String(a[key]).localeCompare(String(b[key]));
    //         },
    //     }));

    //     return additionalColumns ? [...cols, ...additionalColumns] : cols;
    // };


    const takeDataFromServer = async (page = 1, size = initialPageSize) => {
        try {
            setLoading(true);
            const res = await service.getList({ page, pageSize: size, });
            const itemsWithKey = res.data.map(item => ({ ...item, key: item.id }));
            setData(itemsWithKey);
            setTotal(res.total ?? (res.data ? res.data.length : 0));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        takeDataFromServer(current, pageSize);
    }, [current, pageSize, service]);

    const handleDelete = async (row: T) => {
        const id = keyColumn ? (row as any)[keyColumn] : (row as any).key ?? (row as any).id;
        if (!service.delete) {
            // local delete fallback
            setData(prev => prev.filter(r => {
                const rid = keyColumn ? (r as any)[keyColumn] : (r as any).key ?? (r as any).id;
                return rid !== id;
            }));
            return;
        }
        try {
            await service.delete(id);
            // refetch current page or remove locally:
            setData(prev => prev.filter(r => {
                const rid = keyColumn ? (r as any)[keyColumn] : (r as any).key ?? (r as any).id;
                return rid !== id;
            }));
            // or fetch(current, pageSize);
        } catch (err) {
            console.error("delete failed", err);
        }
    };



    // generate columns dynamically if not provided via props.columns
    const baseColumns: ColumnsType<T> =
        data.length
            ? (Object.keys(data[0]) as (keyof T)[]).map(k => ({
                title: String(k)
                    .replace(/([A-Z])/g, " $1")        // Add space before capitals
                    .replace(/^./, (str) => str.toUpperCase()) // Uppercase first letter
                    .trim(),
                dataIndex: k as string,
                key: String(k),
                width:String(k) === 'userId' ? 100 : undefined,
                // align:'center',
                sorter: (a: any, b: any) => {
                    const va = a[k as any], vb = b[k as any];
                    if (typeof va === "number" && typeof vb === "number") return va - vb;
                    return String(va ?? "").localeCompare(String(vb ?? ""));
                },
            }))
            : [];

    const actionColumn: ColumnsType<T> = [
        {
            title: "Actions",
            key: "__actions",
            width: 90,
            fixed: undefined,
            align: 'center',
            render: (_: any, record: T) => (
                <Space>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                        <Button type="text" icon={<TrashIcon size={18} />} />
                    </Popconfirm>
                </Space>
            ),
        } as any,
    ];

    const finalColumns: ColumnsType<T> =
        additionalColumns
            ? [...baseColumns, ...additionalColumns, ...actionColumn]
            : [...baseColumns, ...actionColumn];

    // rowKey: either the provided keyColumn or fallback to 'key' or 'id'
    const rowKeyFunc = (record: T) => {
        if (keyColumn && keyColumn in record) {
            return record[keyColumn] as React.Key;
        }

        if ("key" in record) {
            // console.log('record', record["key"])

            return record["key"] as React.Key;
        }

        if ("id" in record) {
            console.log('record', record["id"])
            return record["id"] as React.Key;
        }

        console.warn("⚠️ No valid row key found in record:", record);
        return Math.random().toString(); // fallback (not ideal)
    };

    return (
        <div>
            <TitlePage
                title={title}
                elements={
                    <>
                        {elementsTitle}

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
                                transition: "width 0.3s ease, opacity 0.3s ease",
                                opacity: isOpenFilter ? 1 : 0,
                            }}
                        >
                            <Input.Search
                                placeholder="Search..."
                                size="large"
                                className={`w-full m-0 ${isOpenFilter ? "cursor-auto" : "cursor-no-none"
                                    }`}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                    </>
                }
            />

            <ReusableTable<T>
                columns={finalColumns}
                loading={loading}
                dataSource={data}
                searchText={searchText}
                inlineEdit={false}
                withActions={true}
                selectable={false}
                globalSearch={true}
                rowKey={rowKeyFunc}
                pagination={{
                    current,
                    pageSize,
                    total,
                    showSizeChanger: true,
                    pageSizeOptions,
                    onChange: (page, size) => {
                        if (size && size !== pageSize) {
                            setPageSize(size);
                            setCurrent(1);
                        } else {
                            setCurrent(page);
                        }
                    },
                    onShowSizeChange: (_, size) => {
                        setPageSize(size);
                        setCurrent(1);
                    },
                }}

                style={{
                    border: `1px solid ${token.colorText}`,
                    borderRadius: "4px",
                    padding: "0px 0px 10px 0px",
                }}
                scroll={{ x: 1200 }}
                {...rest}
            />


        </div>
    );
};
export default GenericTable