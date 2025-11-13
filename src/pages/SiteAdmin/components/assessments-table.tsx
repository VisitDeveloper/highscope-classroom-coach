import React from "react";
import { Button, Col, Input, Row, Select, Table, theme } from "antd";
import type { ColumnsType } from "antd/es/table";
import TitlePage from "./../../../components/common/title-page";
import AssessmentsStatus from "./../../../components/common/assessments-status";


type AssessmentType = 'baseline' | 'mid-year' | 'end-of-the-year';



interface DataType {
    key: string;
    area?: string;
    section?: string;
    isHeader?: boolean;
}

const data: DataType[] = [
    { key: "h1", area: "I. Learning Environment", isHeader: true },
    { key: "1A", section: "A. Named and Organized Interest Areas" },
    { key: "1B", section: "B. Plentiful Materials" },
    { key: "1C", section: "C. Safe Play Areas" },
    { key: "1D", section: "D. Children’s Work and Environmental Print" },

    { key: "h2", area: "II. Teaching and Learning Routines and Adult-Child Interactions", isHeader: true },
    { key: "2A", section: "A. Teaching and Learning Routines" },
    { key: "2B", section: "B. Child-initiated Activities" },
    { key: "2C", section: "C. Adults Support Children's Activities" },
    { key: "2D", section: "D. Large Group Activities" },
    { key: "2E", section: "E. Small Group Activities" },
    { key: "2F", section: "F. Sensitive and Responsive Environment" },
    { key: "2G", section: "G. Planning and Reflection" },
    { key: "2H", section: "H. Language and Literacy" },
    { key: "2I", section: "I. Mathematics" },
    { key: "2K", section: "K. Social Interaction" },
    { key: "2L", section: "L. Conflict Resolution" },


    { key: "h3", area: "III. Curriculum, Planning, Assessment, and Family Engagement", isHeader: true },
    { key: "3A", section: "A. Comprehensive Teaching Practices" },
    { key: "3B", section: "B. Progress Documentation" },
    { key: "3C", section: "C. Anecdotal Notes" },
    { key: "3D", section: "D. Family Engagement" },
];


const columns: ColumnsType<DataType> = [
    {
        title: "Assessment Area",
        dataIndex: "section",
        key: "section",

        onCell: (record) =>
            record.isHeader
                ? {
                    colSpan: 5,
                    style: {
                        backgroundColor: "#e5e7eb",
                        textAlign: "left" as const,
                        fontWeight: 600,
                        borderTop: "2px solid #d9d9d9",
                        borderBottom: "2px solid #d9d9d9",
                    },
                }
                : {},
        render: (_: any, record: DataType) =>
            record.isHeader ? (
                <strong style={{ fontSize: 15, }}>{record.area}</strong>
            ) : (
                record.section
            ),
    },
    {
        title: "test_class 1",
        key: "t1",
        align: "center" as const,
        onCell: (record) => (record.isHeader ? { colSpan: 0 } : {}),
        render: (_: any, record: DataType) =>
            !record.isHeader && <AssessmentsStatus type="in-progress" />,
    },
    {
        title: "test_class 2",
        key: "t2",
        align: "center" as const,
        onCell: (record) => (record.isHeader ? { colSpan: 0 } : {}),
        render: (_: any, record: DataType) =>
            !record.isHeader && <AssessmentsStatus type="completed" />,
    },
    {
        title: "test_class 3",
        key: "t3",
        align: "center" as const,
        onCell: (record) => (record.isHeader ? { colSpan: 0 } : {}),
        render: (_: any, record: DataType) =>
            !record.isHeader && <span className="flex justify-center"><AssessmentsStatus type="evidence-added" /></span>,
    },
];



// حذف سلول‌های غیرضروری در ردیف‌های header
const mergedColumns = columns.map((col, index) => {
    if (index > 0) {
        return {
            ...col,
            onCell: (record: DataType) => {
                if (record.isHeader) {
                    return { colSpan: 0 };
                }
                return {};
            },
        };
    }
    return col;
});

const AssessmentTable: React.FC = () => {
    const { token: { colorText } } = theme.useToken();
    const [site, setSite] = React.useState<string>("all");
    const [assessmentsType, setAssessmentsType] = React.useState<AssessmentType>('baseline');
    const [filterClassRoom, setFilterClassRoom] = React.useState<string>("all");


    const handleChange = (value: AssessmentType) => {
        setAssessmentsType(value as AssessmentType);
    };

    return (
        <div>
            <TitlePage title="Assessments" elements={
                <Button type="primary" >
                    Add Assessment
                </Button>
            }/>
            <div className="my-4! ">
                <Row gutter={[16, 16]}>
                    <Col xl={11} lg={11} md={24} sm={24} xs={24}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="site" className="text-lg">
                                Site
                            </label>
                            <Select
                                id="site"
                                defaultValue={'baseline'}
                                onChange={handleChange}
                                options={[
                                    { value: 'baseline', label: 'Baseline' },
                                    { value: 'mid-year', label: 'Mid Year' },
                                    { value: 'end-of-the-year', label: 'End of the Year' },
                                ]}
                            />
                        </div>
                    </Col>
                    <Col xl={2} lg={2} />
                    <Col xl={11} lg={11} md={24} sm={24} xs={24}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="site" className="text-lg">
                                Classroom
                            </label>
                            <Select
                                id="site"
                                defaultValue={'baseline'}
                                onChange={handleChange}
                                options={[
                                    { value: 'baseline', label: 'Baseline' },
                                    { value: 'mid-year', label: 'Mid Year' },
                                    { value: 'end-of-the-year', label: 'End of the Year' },
                                ]}
                            />
                        </div>
                    </Col>

                </Row>
                <Row gutter={[16, 16]} className="mt-4!">
                    <Col xl={11} lg={11} md={24} sm={24} xs={24}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="site" className="text-lg">
                                Assessment Type
                            </label>
                            <Select
                                id="site"
                                defaultValue={'baseline'}
                                onChange={handleChange}
                                options={[
                                    { value: 'baseline', label: 'Baseline' },
                                    { value: 'mid-year', label: 'Mid Year' },
                                    { value: 'end-of-the-year', label: 'End of the Year' },
                                ]}
                            />
                        </div>
                    </Col>
                    <Col xl={2} lg={2} />
                    <Col xl={11} lg={11} md={24} sm={24} xs={24}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="site" className="text-lg">
                                Year
                            </label>
                            <Input
                                value={'2025 - 2026'}
                                disabled
                                style={{ color: colorText }}
                            />
                        </div>
                    </Col>

                </Row>

            </div>

            <div className="flex  flex-col lg:flex-row gap-5 justify-start  items-start lg:items-center mb-5! mt-2!">
                <div className="flex flex-row items-center gap-2">
                    <AssessmentsStatus type="completed" />
                    <span>Completed</span>
                </div>

                <div className="flex flex-row gap-2">
                    <AssessmentsStatus type="in-progress" />
                    <span>In Progress</span>
                </div>

                <div className="flex flex-row gap-2">
                    <AssessmentsStatus type="evidence-added" />
                    <span>Evidence Added</span>
                </div>

                <div className="flex flex-row gap-2">
                    <AssessmentsStatus type="not-started" />
                    <span>Not Started</span>
                </div>
            </div>


            <Table<DataType>
                bordered={true}
                className="border-2 border-solid border-[#121212] rounded-sm p-1!"
                size="small"
                pagination={false}
                columns={mergedColumns}
                dataSource={data}
                rowKey="key"
                style={{ width: "100%", background: "#fff" }}
                scroll={{ x: 1000 }}

            />
        </div>
    );
};

export default AssessmentTable;
