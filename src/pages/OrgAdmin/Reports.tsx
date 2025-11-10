import { Col, Row, theme, Typography } from 'antd';
import { useCallback } from 'react';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
}

const reportsData: ReportCard[] = [
  {
    id: 'classroom-report',
    title: 'Classroom Report',
    description:
      'Generate comprehensive classroom reports with detailed analytics and insights about classroom performance and activities.',
    imageUrl: '/images/cc.jpg',
  },
  {
    id: 'export-csv',
    title: 'Export data to CSV file',
    description:
      'Export your data to CSV format for external analysis, reporting, or integration with other systems.',
    imageUrl: '/images/ec.jpg',
  },
  {
    id: 'planning-report',
    title: 'Planning Report',
    description:
      'View and analyze planning reports to track curriculum planning, lesson plans, and educational objectives.',
    imageUrl: '/images/pr.jpg',
  },
  {
    id: 'completion-report',
    title: 'Completion Report',
    description:
      'Monitor completion rates and track progress across different activities, assessments, and assignments.',
    imageUrl: '/images/cr.jpg',
  },
];

interface ReportCardComponentProps {
  report: ReportCard;
}

function ReportCardComponent({ report }: ReportCardComponentProps) {
  const {
    token: { colorBgBase },
  } = theme.useToken();

  const handleClick = useCallback(() => {
    if (report.onClick) {
      report.onClick();
    }
  }, [report]);

  return (
    <div
      className="w-full min-h-[220px] lg:h-[220px] rounded-lg shadow-xl flex flex-col lg:flex-row cursor-pointer transition-transform hover:scale-[1.02]"
      style={{ backgroundColor: colorBgBase }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div
        className="w-full lg:w-40 min-h-[220px] lg:h-full bg-no-repeat bg-center bg-cover lg:rounded-tl-lg lg:rounded-bl-lg rounded-t-lg rounded-b-lg"
        style={{ backgroundImage: `url('${report.imageUrl}')` }}
        aria-label={`${report.title} image`}
      />
      <div className="flex flex-col flex-1 p-4! ml-4!">
        <Typography.Title level={4} className="text-lg! lg:text-xl! font-bold! mb-2! mt-0! line-clamp-1">
          {report.title}
        </Typography.Title>
        <Typography.Paragraph className="mb-0! pr-2! text-sm line-clamp-4">
          {report.description}
        </Typography.Paragraph>
      </div>
    </div>
  );
}

function Reports() {
  const handleReportClick = useCallback((reportId: string) => {
    // TODO: Implement navigation or action for each report
    console.log(`Report clicked: ${reportId}`);
  }, []);

  const reportsWithHandlers = reportsData.map((report) => ({
    ...report,
    onClick: () => handleReportClick(report.id),
  }));

  return (
    <div className="flex flex-col gap-8">
      <Row gutter={[24, 24]}>
        {reportsWithHandlers.map((report) => (
          <Col key={report.id} xs={24} sm={24} md={24} lg={12} xl={12}>
            <ReportCardComponent report={report} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Reports;