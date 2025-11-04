import React from "react";
import { Card, Avatar, Button, Typography, theme } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  role: string;
  location: string;
  profileImage?: string;
}

interface ProfileCardProps {
  profileData: ProfileData;
  onEditProfile?: () => void;
  onEditPersonalInfo?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileData,
  onEditProfile,
  onEditPersonalInfo,
}) => {
  const {
    token: {
      colorBgElevated,
      colorText,
      colorTextSecondary,
      borderRadiusLG,
      colorBgContainer,
    },
  } = theme.useToken();

  const cardStyle: React.CSSProperties = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: 24,
  };

  return (
    <div className="w-full">
      {/* Profile Summary Card */}
      <Card style={cardStyle} bodyStyle={{ padding: "24px" }} className="shadow-none! border-2! border-solid! border-white! rounded-sm bg-[#E8E8E8]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Picture */}
          <Avatar
            size={120}
            src={profileData.profileImage}
            style={{
              backgroundColor: "#43B02A",
              flexShrink: 0,
            }}
          >
            {!profileData.profileImage && (
              <span style={{ fontSize: 48 }}>
                {profileData.firstName?.[0]?.toUpperCase()}
                {profileData.lastName?.[0]?.toUpperCase()}
              </span>
            )}
          </Avatar>

          {/* Profile Info */}
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <Title
                  level={2}
                  style={{
                    margin: 0,
                    marginBottom: 8,
                    color: colorText,
                    fontWeight: 600,
                  }}
                >
                  {profileData.firstName} {profileData.lastName}
                </Title>
                <Text
                  style={{
                    display: "block",
                    marginBottom: 4,
                    // color: colorTextSecondary,
                    fontSize: 16,
                  }}
                >
                  {profileData.role}
                </Text>
                <Text
                  style={{
                    display: "block",
                    // color: colorTextSecondary,
                    fontSize: 14,
                  }}
                >
                  {profileData.location}
                </Text>
              </div>

              {/* Edit Button */}
              <Button
                type="default"
                icon={<EditOutlined />}
                onClick={onEditProfile}
                style={{
                  borderRadius: borderRadiusLG,
                  borderColor: colorTextSecondary,
                  color: colorText,
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information Card */}
      <Card style={cardStyle} bodyStyle={{ padding: "24px" }} className="shadow-none! border-2! border-solid! border-white! rounded-sm bg-[#E8E8E8]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12!">
          <Title
            level={3}
            style={{
              margin: 0,
              color: colorText,
              fontWeight: 600,
            }}
          >
            Personal Information
          </Title>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <div>
              <Text
                style={{
                  display: "block",
                  marginBottom: 8,
                  // color: colorTextSecondary,
                  fontSize: 14,
                }}
              >
                First Name
              </Text>
              <Text
                style={{
                  display: "block",
                  color: colorText,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {profileData.firstName}
              </Text>
            </div>

            <div>
              <Text
                style={{
                  display: "block",
                  marginBottom: 8,
                  // color: colorTextSecondary,
                  fontSize: 14,
                }}
              >
                Email address
              </Text>
              <Text
                style={{
                  display: "block",
                  color: colorText,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {profileData.email}
              </Text>
            </div>

            <div>
              <Text
                style={{
                  display: "block",
                  marginBottom: 8,
                  // color: colorTextSecondary,
                  fontSize: 14,
                }}
              >
                Bio
              </Text>
              <Text
                style={{
                  display: "block",
                  color: colorText,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {profileData.bio}
              </Text>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <div>
              <Text
                style={{
                  display: "block",
                  marginBottom: 8,
                  // color: colorTextSecondary,
                  fontSize: 14,
                }}
              >
                Last Name
              </Text>
              <Text
                style={{
                  display: "block",
                  color: colorText,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {profileData.lastName}
              </Text>
            </div>

            <div>
              <Text
                style={{
                  display: "block",
                  marginBottom: 8,
                  // color: colorTextSecondary,
                  fontSize: 14,
                }}
              >
                Phone
              </Text>
              <Text
                style={{
                  display: "block",
                  color: colorText,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {profileData.phone}
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;
