import { Button, Col, Row, theme, Typography } from "antd";
import Link from "antd/es/typography/Link";

import {
  FilePdfIcon,
  CalendarBlankIcon,
  FileCloudIcon,
} from "@phosphor-icons/react";
import TitlePage from "./../../components/common/title-page";

const resourcesLinks = [
  {
    title: "Classroom Coach and ECERS-3 Crosswalk",
    href: "https://ccoach.highscopeplatform.org/Resources/ClassroomCoachandECERS-3Crosswalk.pdf",
  },
  {
    title: "Classroom Coach and PQA Crosswalk",
    href: "https://ccoach.highscopeplatform.org/Resources/ClassroomCoachandPQA.pdf",
  },
  {
    title: "Classroom Coach Classroom Materials Checklist",
    href: "https://ccoach.highscopeplatform.org/Resources/ClassroomCoachClassroomMaterialsChecklist.pdf",
  },
  {
    title: "Classroom Coach FAQ",
    href: "https://ccoach.highscopeplatform.org/Resources/ClassroomCoachFAQ.pdf",
  },
  {
    title: "Classroom Coach Glossary",
    href: "https://ccoach.highscopeplatform.org/Resources/ClassroomCoachGlossary.pdf",
  },
  {
    title: "Classroom Coach Measurement Tool",
    href: "https://ccoach.highscopeplatform.org/Resources/ClassroomCoachMeasurementTool.pdf",
  },
  {
    title: "Classroom Coach Research Base",
    href: "https://ccoach.highscopeplatform.org/Resources/ClassroomCoachResearchBase.pdf",
  },
  {
    title: "Classroom Coach Research Base",
    href: "https://ccoach.highscopeplatform.org/Resources/ClassroomCoachResearchBase.pdf",
  },
  {
    title: "Classroom Coach Scoring Guide",
    href: "https://ccoach.highscopeplatform.org/Resources/ClassroomCoachScoringGuide.pdf",
  },
  {
    title: "Classroom Coach Scoring Summary",
    href: "https://ccoach.highscopeplatform.org/Resources/ClassroomCoachScoringSummary.pdf",
  },
  {
    title: "Classroom Coach Strategy Report Instructions",
    href: "https://ccoach.highscopeplatform.org/Resources/ClassroomCoachReportInstructions.pdf",
  },
  {
    title: "Classroom Coach Technical Report",
    href: "https://ccoach.highscopeplatform.org/Resources/ClassroomCoachTechnicalReport.pdf",
  },
];

export default function Resources() {
  const {
    token: { colorPrimary, colorBorder, colorError },
  } = theme.useToken();
  return (
    <div>
      <TitlePage title="Resources" />

      <Row gutter={[25, 25]} className="mt-4!">
        {resourcesLinks.map((resource, index) => (
          <Col
            key={resource.title + index}
            xs={24}
            sm={12}
            md={12}
            lg={12}
            xl={8}
            xxl={6}
          >
            <div className="rounded-sm shadow-lg bg-[#e8e8e8] flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1.5 px-4! py-3!">
                <FilePdfIcon size={55} color={colorError} />

                <Typography.Text style={{ fontWeight: 500 }}>
                  {resource.title}
                </Typography.Text>
              </div>
              <div className="flex flex-col gap-2.5 h-[170px] rounded-0 justify-start items-start bg-[#F6F6F6] px-4! py-3! rounded-sm">
                <div className="flex flex-row gap-4 mt-5!">
                  <FileCloudIcon style={{ fontSize: 20, color: colorBorder }} />
                  <span
                    className="font-medium text-1xl "
                    style={{ color: colorBorder }}
                  >
                    12.5 KB
                  </span>
                </div>

                <div className="flex flex-row gap-4">
                  <CalendarBlankIcon
                    style={{ fontSize: 20, color: colorBorder }}
                  />
                  <span
                    className="font-medium text-1xl"
                    style={{ color: colorBorder }}
                  >
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-center items-center w-full mt-7! mb-4!">
                  <Link href={resource.href} target="_blank">
                    <Button
                      type="default"
                      size="small"
                      style={{ color: colorPrimary, borderColor: colorPrimary }}
                    >
                      Download
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
