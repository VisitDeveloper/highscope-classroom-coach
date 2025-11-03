import { useEffect, useState } from "react";
import { Button, Input, theme } from "antd";
import TitlePage from "./../../../components/common/title-page";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { useWindowSize } from "./../../../hooks/use-size";
import ModalCommon from "./../../../components/ui/modal";
import ModalCreateClassRoomForm from "./../Modal/ModalCreateClassRoom";
import ReusableTable from "./../../../components/ui/reusable-table";
import type { ColumnsType } from "antd/es/table";

interface GenericTableProps<T> {
    service: {
        getList: (params?: any) => Promise<{ data: T[] }>;
    };
    title: string;
    keyColumn?: keyof T; // optional: key column for selection or deletion
    additionalColumns?: ColumnsType<T>; // برای ستون‌هایی که میخوای اضافه بشه مثل دکمه‌ها
}

export const GenericTable = <T extends { key: React.Key }>({
    service,
    title,
    keyColumn,
    additionalColumns,
}: GenericTableProps<T>) => {
    const { token } = theme.useToken();
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const { width } = useWindowSize();
    const inputWidth = width < 768 ? 150 : 200;
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    // generate columns dynamically from keys
    const generateColumns = (items: T[]): ColumnsType<T> => {
        if (!items || items.length === 0) return [];

        const keys = Object.keys(items[0]) as (keyof T)[];
        const cols: ColumnsType<T> = keys.map((key) => ({
            title: String(key).replace(/([A-Z])/g, " $1"), // camelCase to spaced
            dataIndex: key as string,
            key: String(key),
            align: "center",
            sorter: (a, b) => {
                if (typeof a[key] === "number" && typeof b[key] === "number") {
                    return (a[key] as number) - (b[key] as number);
                }
                return String(a[key]).localeCompare(String(b[key]));
            },
        }));

        return additionalColumns ? [...cols, ...additionalColumns] : cols;
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await service.getList();
                setData(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [service]);

    return (
        <div>
            <TitlePage
                title={title}
                elements={
                    <>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => setOpenModal(true)}
                        >
                            <PlusOutlined />
                        </Button>

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
                columns={generateColumns(data)}
                dataSource={data}
                searchText={searchText}
                inlineEdit={false}
                withActions={true}
                selectable={!!keyColumn}
                globalSearch={true}
                pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "50"],
                }}
                style={{
                    border: `1px solid ${token.colorText}`,
                    borderRadius: "4px",
                    padding: "0px 0px 10px 0px",
                }}
                scroll={{ x: 1200 }}
            />

            {openModal && (
                <ModalCommon
                    titleModal="Create Item"
                    openModal={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <ModalCreateClassRoomForm />
                </ModalCommon>
            )}
        </div>
    );
};
